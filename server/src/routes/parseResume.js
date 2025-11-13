import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';

const upload = multer();
const router = express.Router();

const SKILL_LIST = [
  'javascript',
  'react',
  'node',
  'express',
  'python',
  'django',
  'java',
  'spring',
  'sql',
  'mongodb',
  'aws',
  'docker',
  'html',
  'css'
];

const extractSkillsFromText = (text = '') => {
  const found = new Set();
  const lower = text.toLowerCase();
  SKILL_LIST.forEach((skill) => {
    if (lower.includes(skill)) {
      found.add(skill);
    }
  });
  return Array.from(found);
};

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: 'No file uploaded' });
    }

    const parsed = await pdfParse(req.file.buffer);
    const rawText = parsed.text || '';
    const skills = extractSkillsFromText(rawText);

    return res.json({
      ok: true,
      extractedSkills: skills,
      sampleText: rawText.slice(0, 500),
      note: 'TODO: Persist extracted skills to user profile in Part 2.'
    });
  } catch (error) {
    console.error('parse-resume error', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to parse resume. Ensure you uploaded a valid PDF.'
    });
  }
});

export default router;
