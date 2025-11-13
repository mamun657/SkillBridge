import express from 'express';

const router = express.Router();

const buildDefaultQuestion = (jobTitle) => ({
  question: `Tell me about a time you solved a challenging problem related to ${jobTitle}.`,
  answerHint: 'Use STAR (Situation, Task, Action, Result) to structure your answer.'
});

router.post('/', (req, res) => {
  try {
    const { jobTitle = 'the role', skills = [] } = req.body;

    if (!Array.isArray(skills)) {
      return res
        .status(400)
        .json({ ok: false, error: 'skills must be an array of strings' });
    }

    const trimmedSkills = skills
      .map((skill) => skill.trim())
      .filter(Boolean)
      .slice(0, 5);

    const questions = trimmedSkills.map((skill) => ({
      question: `Explain ${skill} and how you would apply it in the ${jobTitle} role.`,
      answerHint: `Describe ${skill} clearly and share a concise real-world example.`
    }));

    while (questions.length < 5) {
      questions.push(buildDefaultQuestion(jobTitle));
    }

    return res.json({ ok: true, questions });
  } catch (error) {
    console.error('generate-questions error', error);
    return res.status(500).json({ ok: false, error: 'Failed to generate interview questions' });
  }
});

export default router;
