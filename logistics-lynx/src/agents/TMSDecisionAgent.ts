import { BaseAgent } from './BaseAgent'

export class TMSDecisionAgent extends BaseAgent {
  private decisionThreshold: number = 0.8
  private maxConcurrentTasks: number = 5
  private currentTasks: Set<string> = new Set()
  private processingInterval?: NodeJS.Timeout

  constructor() {
    super(
      'tms-decision-agent-001',
      'decision',
      'TMS Decision Agent',
      ['route_optimization', 'load_matching', 'pricing', 'risk_assessment', 'capacity_planning']
    )
  }

  protected async handleNewTask(task: any): Promise<void> {
    if (this.currentTasks.size >= this.maxConcurrentTasks) {
      console.log(`Agent at capacity, queuing task ${task.id}`)
      return
    }

    this.currentTasks.add(task.id)
    await this.processTask(task)
  }

  protected async handleConfigurationUpdate(config: any): Promise<void> {
    if (config.configuration) {
      this.decisionThreshold = config.configuration.decision_threshold || 0.8
      this.maxConcurrentTasks = config.configuration.max_concurrent_tasks || 5
      console.log(`Configuration updated for agent ${this.agentId}`)
    }
  }

  protected getConfiguration(): any {
    return {
      decision_threshold: this.decisionThreshold,
      max_concurrent_tasks: this.maxConcurrentTasks,
      capabilities: this.capabilities,
      version: '1.0.0'
    }
  }

  protected async run(): Promise<void> {
    // Start the processing loop
    this.processingInterval = setInterval(async () => {
      if (!this.isRunning) return

      try {
        // Get pending tasks
        const tasks = await this.getPendingTasks()
        
        for (const task of tasks) {
          if (this.currentTasks.size >= this.maxConcurrentTasks) break
          
          if (!this.currentTasks.has(task.id)) {
            this.currentTasks.add(task.id)
            this.processTask(task)
          }
        }
      } catch (error) {
        console.error(`Error in agent processing loop: ${error}`)
        await this.logEvent('agent_error', { error: error.message }, 'error')
      }
    }, 5000) // Process every 5 seconds
  }

  private async processTask(task: any): Promise<void> {
    try {
      await this.updateTaskStatus(task.id, 'running')
      await this.logEvent('task_started', { 
        task_id: task.id, 
        task_type: task.task_type,
        priority: task.priority 
      })

      let result: any
      let confidence: number = 0
      let reasoning: string = ''

      switch (task.task_type) {
        case 'route_optimization':
          result = await this.optimizeRoute(task.payload)
          confidence = 0.95
          reasoning = 'Route optimization completed using historical data and real-time conditions'
          break

        case 'load_matching':
          result = await this.matchLoad(task.payload)
          confidence = 0.88
          reasoning = 'Load matching completed using carrier preferences and availability'
          break

        case 'pricing':
          result = await this.calculatePricing(task.payload)
          confidence = 0.92
          reasoning = 'Pricing calculated using market rates and cost analysis'
          break

        case 'risk_assessment':
          result = await this.assessRisk(task.payload)
          confidence = 0.85
          reasoning = 'Risk assessment completed using historical data and current conditions'
          break

        case 'capacity_planning':
          result = await this.planCapacity(task.payload)
          confidence = 0.90
          reasoning = 'Capacity planning completed using demand forecasting and resource analysis'
          break

        default:
          throw new Error(`Unknown task type: ${task.task_type}`)
      }

      // Log decision if confidence meets threshold
      if (confidence >= this.decisionThreshold) {
        await this.logDecision(
          task.task_type,
          task.payload,
          result,
          confidence,
          reasoning
        )
      }

      await this.updateTaskStatus(task.id, 'completed', result)
      await this.logEvent('task_completed', { 
        task_id: task.id, 
        task_type: task.task_type,
        confidence,
        processing_time: Date.now() - new Date(task.created_at).getTime()
      })

    } catch (error) {
      await this.updateTaskStatus(task.id, 'failed', null, error.message)
      await this.logEvent('task_failed', { 
        task_id: task.id, 
        task_type: task.task_type,
        error: error.message 
      }, 'error')
    } finally {
      this.currentTasks.delete(task.id)
    }
  }

  // Task processing methods
  private async optimizeRoute(payload: any): Promise<any> {
    const { origin, destination, cargo, constraints } = payload
    
    // Simulate route optimization logic
    const baseDistance = this.calculateDistance(origin, destination)
    const optimizedDistance = baseDistance * 0.9 // 10% optimization
    const estimatedTime = this.calculateTime(optimizedDistance, cargo.weight)
    const fuelSavings = this.calculateFuelSavings(baseDistance, optimizedDistance)
    
    return {
      optimized_route: {
        origin,
        destination,
        waypoints: this.generateWaypoints(origin, destination),
        distance: optimizedDistance,
        estimated_time: estimatedTime
      },
      savings: {
        distance_reduction: baseDistance - optimizedDistance,
        time_reduction: this.calculateTime(baseDistance, cargo.weight) - estimatedTime,
        fuel_savings: fuelSavings,
        cost_savings: fuelSavings * 3.5 // Assuming $3.50 per gallon
      },
      constraints_met: this.checkConstraints(constraints, estimatedTime, fuelSavings)
    }
  }

  private async matchLoad(payload: any): Promise<any> {
    const { load, carriers, preferences } = payload
    
    // Simulate load matching logic
    const matchedCarriers = carriers
      .filter(carrier => this.checkCarrierCompatibility(carrier, load))
      .sort((a, b) => this.calculateMatchScore(b, load, preferences) - this.calculateMatchScore(a, load, preferences))
      .slice(0, 3)
      .map(carrier => ({
        ...carrier,
        match_score: this.calculateMatchScore(carrier, load, preferences),
        estimated_pickup: this.calculatePickupTime(carrier, load),
        estimated_delivery: this.calculateDeliveryTime(carrier, load)
      }))

    return {
      matched_carriers: matchedCarriers,
      total_matches: matchedCarriers.length,
      best_match: matchedCarriers[0] || null,
      match_criteria: {
        location_compatibility: true,
        capacity_available: true,
        equipment_match: true,
        availability_window: true
      }
    }
  }

  private async calculatePricing(payload: any): Promise<any> {
    const { base_price, market_conditions, fuel_prices, distance, cargo } = payload
    
    // Simulate pricing calculation
    const fuelSurcharge = this.calculateFuelSurcharge(fuel_prices, distance)
    const marketAdjustment = this.calculateMarketAdjustment(market_conditions, base_price)
    const cargoSurcharge = this.calculateCargoSurcharge(cargo)
    const finalPrice = base_price + fuelSurcharge + marketAdjustment + cargoSurcharge
    
    return {
      base_price,
      breakdown: {
        fuel_surcharge: fuelSurcharge,
        market_adjustment: marketAdjustment,
        cargo_surcharge: cargoSurcharge
      },
      final_price: finalPrice,
      price_per_mile: finalPrice / distance,
      market_competitiveness: this.assessMarketCompetitiveness(finalPrice, market_conditions)
    }
  }

  private async assessRisk(payload: any): Promise<any> {
    const { route, cargo, weather, traffic, historical_data } = payload
    
    // Simulate risk assessment
    const weatherRisk = this.assessWeatherRisk(weather, route)
    const trafficRisk = this.assessTrafficRisk(traffic, route)
    const cargoRisk = this.assessCargoRisk(cargo)
    const historicalRisk = this.assessHistoricalRisk(historical_data, route)
    
    const totalRisk = (weatherRisk + trafficRisk + cargoRisk + historicalRisk) / 4
    
    return {
      risk_score: totalRisk,
      risk_factors: {
        weather: weatherRisk,
        traffic: trafficRisk,
        cargo: cargoRisk,
        historical: historicalRisk
      },
      risk_level: this.getRiskLevel(totalRisk),
      recommendations: this.generateRiskRecommendations(totalRisk, {
        weather: weatherRisk,
        traffic: trafficRisk,
        cargo: cargoRisk,
        historical: historicalRisk
      }),
      insurance_required: totalRisk > 0.3
    }
  }

  private async planCapacity(payload: any): Promise<any> {
    const { demand_forecast, current_capacity, time_period } = payload
    
    // Simulate capacity planning
    const projectedDemand = this.forecastDemand(demand_forecast, time_period)
    const capacityGap = projectedDemand - current_capacity
    const recommendations = this.generateCapacityRecommendations(capacityGap, time_period)
    
    return {
      projected_demand: projectedDemand,
      current_capacity: current_capacity,
      capacity_gap: capacityGap,
      recommendations: recommendations,
      timeline: this.generateCapacityTimeline(recommendations, time_period),
      investment_required: this.calculateInvestmentRequired(recommendations)
    }
  }

  // Helper methods for calculations
  private calculateDistance(origin: string, destination: string): number {
    // Simulate distance calculation
    return Math.random() * 1000 + 100
  }

  private calculateTime(distance: number, weight: number): number {
    // Simulate time calculation based on distance and weight
    return distance * 0.1 + weight * 0.01
  }

  private calculateFuelSavings(originalDistance: number, optimizedDistance: number): number {
    // Simulate fuel savings calculation
    const mpg = 6.5 // Average truck MPG
    return (originalDistance - optimizedDistance) / mpg
  }

  private generateWaypoints(origin: string, destination: string): string[] {
    // Simulate waypoint generation
    return ['Waypoint 1', 'Waypoint 2', 'Waypoint 3']
  }

  private checkConstraints(constraints: any, time: number, savings: number): boolean {
    // Check if solution meets constraints
    return time <= (constraints.max_time || Infinity) && 
           savings >= (constraints.min_savings || 0)
  }

  private checkCarrierCompatibility(carrier: any, load: any): boolean {
    // Check if carrier can handle the load
    return carrier.capacity >= load.weight && 
           carrier.equipment.includes(load.equipment_type)
  }

  private calculateMatchScore(carrier: any, load: any, preferences: any): number {
    // Calculate how well carrier matches load requirements
    let score = 0.5 // Base score
    
    // Location compatibility
    if (carrier.location === load.origin) score += 0.2
    
    // Capacity match
    const capacityUtilization = load.weight / carrier.capacity
    if (capacityUtilization > 0.8) score += 0.2
    
    // Equipment match
    if (carrier.equipment.includes(load.equipment_type)) score += 0.1
    
    return Math.min(score, 1.0)
  }

  private calculatePickupTime(carrier: any, load: any): string {
    // Calculate estimated pickup time
    return new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString()
  }

  private calculateDeliveryTime(carrier: any, load: any): string {
    // Calculate estimated delivery time
    return new Date(Date.now() + (Math.random() * 3 + 1) * 24 * 60 * 60 * 1000).toISOString()
  }

  private calculateFuelSurcharge(fuelPrices: any, distance: number): number {
    // Calculate fuel surcharge
    return distance * fuelPrices.current * 0.1
  }

  private calculateMarketAdjustment(marketConditions: any, basePrice: number): number {
    // Calculate market adjustment
    return basePrice * (marketConditions.demand_factor - 1) * 0.1
  }

  private calculateCargoSurcharge(cargo: any): number {
    // Calculate cargo-specific surcharge
    return cargo.weight * 0.01 + (cargo.fragile ? 50 : 0)
  }

  private assessMarketCompetitiveness(price: number, marketConditions: any): string {
    // Assess if price is competitive
    const avgPrice = marketConditions.average_price
    if (price < avgPrice * 0.9) return 'very_competitive'
    if (price < avgPrice) return 'competitive'
    if (price < avgPrice * 1.1) return 'average'
    return 'expensive'
  }

  private assessWeatherRisk(weather: any, route: any): number {
    // Assess weather risk
    return weather.severity * 0.3
  }

  private assessTrafficRisk(traffic: any, route: any): number {
    // Assess traffic risk
    return traffic.congestion_level * 0.2
  }

  private assessCargoRisk(cargo: any): number {
    // Assess cargo risk
    return cargo.fragile ? 0.4 : 0.1
  }

  private assessHistoricalRisk(historicalData: any, route: any): number {
    // Assess historical risk
    return historicalData.incident_rate || 0.1
  }

  private getRiskLevel(riskScore: number): string {
    if (riskScore < 0.2) return 'low'
    if (riskScore < 0.5) return 'medium'
    if (riskScore < 0.8) return 'high'
    return 'critical'
  }

  private generateRiskRecommendations(riskScore: number, riskFactors: any): string[] {
    const recommendations = []
    
    if (riskFactors.weather > 0.3) recommendations.push('delay_shipment')
    if (riskFactors.traffic > 0.4) recommendations.push('alternative_route')
    if (riskFactors.cargo > 0.3) recommendations.push('special_handling')
    if (riskScore > 0.5) recommendations.push('additional_insurance')
    
    return recommendations
  }

  private forecastDemand(demandForecast: any, timePeriod: string): number {
    // Simulate demand forecasting
    return demandForecast.base * (1 + demandForecast.growth_rate)
  }

  private generateCapacityRecommendations(capacityGap: number, timePeriod: string): any[] {
    const recommendations = []
    
    if (capacityGap > 0) {
      recommendations.push({
        type: 'add_vehicles',
        quantity: Math.ceil(capacityGap / 10),
        priority: 'high'
      })
      
      if (capacityGap > 50) {
        recommendations.push({
          type: 'hire_drivers',
          quantity: Math.ceil(capacityGap / 20),
          priority: 'medium'
        })
      }
    }
    
    return recommendations
  }

  private generateCapacityTimeline(recommendations: any[], timePeriod: string): any[] {
    // Generate timeline for capacity changes
    return recommendations.map((rec, index) => ({
      ...rec,
      timeline: `${index + 1} month${index > 0 ? 's' : ''}`,
      estimated_cost: this.estimateCost(rec)
    }))
  }

  private calculateInvestmentRequired(recommendations: any[]): number {
    return recommendations.reduce((total, rec) => total + this.estimateCost(rec), 0)
  }

  private estimateCost(recommendation: any): number {
    // Estimate cost for capacity recommendations
    switch (recommendation.type) {
      case 'add_vehicles':
        return recommendation.quantity * 50000
      case 'hire_drivers':
        return recommendation.quantity * 5000
      default:
        return 0
    }
  }

  // Override stop method to clean up processing interval
  async stop(): Promise<void> {
    if (this.processingInterval) {
      clearInterval(this.processingInterval)
    }
    await super.stop()
  }
}
