// Direct test of the website builder service
import { websiteBuilderService } from './src/services/websiteBuilderService.ts';

console.log('🤖 Direct Test of Trans Bot AI Website Builder Service...\n');

async function testService() {
  try {
    console.log('📊 Testing service initialization...');
    
    // Test 1: Get status
    console.log('\n1️⃣ Getting status...');
    const status = await websiteBuilderService.getStatus();
    console.log('✅ Status received:', {
      operational: status.operational,
      paused: status.paused,
      pagesBuilt: status.pagesBuilt,
      pagesInProgress: status.pagesInProgress,
      avgBuildMs: status.avgBuildMs,
      avgSeoScore: status.avgSeoScore
    });

    // Test 2: Get metrics
    console.log('\n2️⃣ Getting metrics...');
    const metrics = await websiteBuilderService.getMetrics();
    console.log('✅ Metrics received:', {
      pagesBuilt: metrics.pagesBuilt,
      pagesInProgress: metrics.pagesInProgress,
      avgBuildMs: metrics.avgBuildMs,
      avgSeoScore: metrics.avgSeoScore,
      totalWords: metrics.totalWords,
      totalImages: metrics.totalImages,
      eventsLast60s: metrics.eventsLast60s
    });

    // Test 3: Build a page
    console.log('\n3️⃣ Building a test page...');
    const buildResult = await websiteBuilderService.buildPage({
      type: 'home',
      priority: 5,
      seed: 'test-direct-001'
    });
    console.log('✅ Build result:', buildResult);

    // Test 4: Listen for events
    console.log('\n4️⃣ Setting up event listener...');
    let eventCount = 0;
    const unsubscribe = websiteBuilderService.onEvent((event) => {
      eventCount++;
      console.log(`📡 Event ${eventCount}:`, {
        type: event.type,
        pageType: event.pageType || 'N/A',
        timestamp: event.timestamp
      });
      
      if (eventCount >= 5) {
        console.log('\n✅ Event system working! Unsubscribing...');
        unsubscribe();
        
        // Test 5: Pause and resume
        console.log('\n5️⃣ Testing pause/resume...');
        await testPauseResume();
      }
    });

    // Test 5: Build another page to trigger events
    console.log('\n🔄 Building another page to trigger events...');
    await websiteBuilderService.buildPage({
      type: 'about',
      priority: 3,
      seed: 'test-direct-002'
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

async function testPauseResume() {
  try {
    // Pause
    console.log('⏸️ Pausing builder...');
    const pauseResult = await websiteBuilderService.pause();
    console.log('✅ Pause result:', pauseResult);

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Resume
    console.log('▶️ Resuming builder...');
    const resumeResult = await websiteBuilderService.resume();
    console.log('✅ Resume result:', resumeResult);

    console.log('\n🎉 All direct tests completed successfully!');
    console.log('🚀 Autonomous website builder service is operational!');
    console.log('🌐 The service should now be working in the browser dashboard');

  } catch (error) {
    console.error('❌ Pause/resume test failed:', error);
  }
}

// Run the test
testService();

// Keep the process running to see events
setTimeout(() => {
  console.log('\n⏰ Direct test completed. Service will continue running...');
  console.log('🔍 Check the browser dashboard for real-time updates');
}, 15000);
