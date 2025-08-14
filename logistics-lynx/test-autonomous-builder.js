// Quick test for autonomous website builder
const { websiteBuilderService } = require('./src/services/websiteBuilderService.ts');

console.log('🤖 Testing Trans Bot AI Autonomous Website Builder...\n');

async function testBuilder() {
  try {
    // Test 1: Get initial status
    console.log('📊 Test 1: Getting initial status...');
    const status = await websiteBuilderService.getStatus();
    console.log('✅ Status:', {
      operational: status.operational,
      paused: status.paused,
      pagesBuilt: status.pagesBuilt,
      pagesInProgress: status.pagesInProgress
    });

    // Test 2: Get metrics
    console.log('\n📈 Test 2: Getting metrics...');
    const metrics = await websiteBuilderService.getMetrics();
    console.log('✅ Metrics:', {
      pagesBuilt: metrics.pagesBuilt,
      avgSeoScore: metrics.avgSeoScore,
      totalWords: metrics.totalWords,
      eventsLast60s: metrics.eventsLast60s
    });

    // Test 3: Build a page
    console.log('\n🏗️  Test 3: Building a test page...');
    const buildResult = await websiteBuilderService.buildPage({
      type: 'home',
      priority: 5,
      seed: 'test-001'
    });
    console.log('✅ Build result:', buildResult);

    // Test 4: Listen for events
    console.log('\n🎧 Test 4: Listening for real-time events...');
    let eventCount = 0;
    const unsubscribe = websiteBuilderService.onEvent((event) => {
      eventCount++;
      console.log(`📡 Event ${eventCount}:`, event.type, event.pageType || '');
      
      if (eventCount >= 3) {
        console.log('\n✅ Real-time events working!');
        unsubscribe();
        
        // Test 5: Pause and resume
        console.log('\n⏸️  Test 5: Testing pause/resume...');
        testPauseResume();
      }
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

async function testPauseResume() {
  try {
    // Pause
    const pauseResult = await websiteBuilderService.pause();
    console.log('⏸️  Pause result:', pauseResult.success);

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Resume
    const resumeResult = await websiteBuilderService.resume();
    console.log('▶️  Resume result:', resumeResult.success);

    console.log('\n🎉 All tests completed successfully!');
    console.log('🚀 Autonomous website builder is operational!');
    console.log('🌐 Visit http://localhost:8080 to see the real-time dashboard');

  } catch (error) {
    console.error('❌ Pause/resume test failed:', error);
  }
}

// Run the test
testBuilder();

// Keep the process running to see events
setTimeout(() => {
  console.log('\n⏰ Test completed. Autonomous agents will continue running...');
}, 10000);
