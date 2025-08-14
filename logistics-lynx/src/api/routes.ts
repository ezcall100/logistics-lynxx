import express from 'express';
import { websiteBuilderAPI } from './website-builder';

const router = express.Router();

// Website Builder API Routes
router.get('/api/website-builder/status', async (req, res) => {
  try {
    const status = await websiteBuilderAPI.getStatus();
    res.json(status);
  } catch (error) {
    console.error('Error getting status:', error);
    res.status(500).json({ error: 'Failed to get status' });
  }
});

router.get('/api/website-builder/metrics', async (req, res) => {
  try {
    const metrics = await websiteBuilderAPI.getMetrics();
    res.json(metrics);
  } catch (error) {
    console.error('Error getting metrics:', error);
    res.status(500).json({ error: 'Failed to get metrics' });
  }
});

router.post('/api/website-builder/pause', async (req, res) => {
  try {
    const result = await websiteBuilderAPI.pause();
    res.json(result);
  } catch (error) {
    console.error('Error pausing builder:', error);
    res.status(500).json({ error: 'Failed to pause builder' });
  }
});

router.post('/api/website-builder/resume', async (req, res) => {
  try {
    const result = await websiteBuilderAPI.resume();
    res.json(result);
  } catch (error) {
    console.error('Error resuming builder:', error);
    res.status(500).json({ error: 'Failed to resume builder' });
  }
});

router.post('/api/website-builder/build', async (req, res) => {
  try {
    const { type, priority, seed } = req.body;
    const result = await websiteBuilderAPI.buildPage({ type, priority, seed });
    res.json(result);
  } catch (error) {
    console.error('Error building page:', error);
    res.status(500).json({ error: 'Failed to build page' });
  }
});

export default router;
