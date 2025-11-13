import express from 'express';

const router = express.Router();

const JOBS = [
  {
    id: 'job-frontend-1',
    title: 'Frontend Engineer',
    company: 'SkillBridge Labs',
    requiredSkills: ['javascript', 'react', 'html', 'css']
  },
  {
    id: 'job-backend-1',
    title: 'Backend Engineer',
    company: 'SkillBridge Labs',
    requiredSkills: ['node', 'express', 'mongodb', 'docker']
  },
  {
    id: 'job-ml-1',
    title: 'Machine Learning Intern',
    company: 'AI Pathways',
    requiredSkills: ['python', 'sql']
  }
];

const scoreJob = (job, userSkills) => {
  const matchedSkills = job.requiredSkills.filter((skill) =>
    userSkills.includes(skill)
  );
  const missingSkills = job.requiredSkills.filter(
    (skill) => !userSkills.includes(skill)
  );
  const ruleScore = matchedSkills.length / Math.max(job.requiredSkills.length, 1);
  const embeddingScore = 0; // Placeholder for future vector-based scoring

  return {
    ...job,
    score: Number((0.7 * ruleScore + 0.3 * embeddingScore).toFixed(2)),
    matchedSkills,
    missingSkills,
    explainability: {
      ruleScore,
      embeddingScore,
      reasoning: `Matched ${matchedSkills.length}/${job.requiredSkills.length} required skills.`
    }
  };
};

router.get('/', (req, res) => {
  try {
    const { userId, skills = '' } = req.query;
    const userSkills = skills
      .split(',')
      .map((skill) => skill.trim().toLowerCase())
      .filter(Boolean);

    if (!userSkills.length) {
      return res.status(400).json({
        ok: false,
        error: 'Provide at least one skill via ?skills=react,html'
      });
    }

    const results = JOBS.map((job) => scoreJob(job, userSkills)).sort(
      (a, b) => b.score - a.score
    );

    return res.json({
      ok: true,
      userId: userId || null,
      results
    });
  } catch (error) {
    console.error('recommendations error', error);
    return res.status(500).json({ ok: false, error: 'Failed to generate recommendations' });
  }
});

export default router;
