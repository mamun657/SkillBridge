import express from 'express';
import { issueCertificate } from '../../mcp/certificateGenerator.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      userId = 'anonymous',
      name = 'Learner',
      courseId = 'course-001',
      courseName = 'SkillBridge Micro-Course'
    } = req.body;

    const certificate = await issueCertificate({
      userId,
      name,
      courseId,
      courseName
    });

    return res.json({
      ok: true,
      certificate,
      message: 'Certificate issued successfully'
    });
  } catch (error) {
    console.error('certificate error', error);
    return res.status(500).json({ ok: false, error: 'Failed to issue certificate' });
  }
});

export default router;
