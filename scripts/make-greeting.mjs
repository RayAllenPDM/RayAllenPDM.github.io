// Generates public/assets/greeting.mp3 with your Fish Audio voice.
// Run on YOUR PC only:   npm run greeting
//
// It reads FISH_API_KEY, FISH_VOICE_ID and FISH_MODELS from a .env file in the
// project root. The .env file is in .gitignore, so your key is never uploaded.
// Only the finished greeting.mp3 goes to GitHub.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Japanese voice line (the English subtitles are the LINES in src/components/Intro.jsx)
const TEXT =
  '通知。訪問者を検知しました。ここは、マスター・レイの個人ポートフォリオです。解析完了。アクセスを許可します。'

function loadEnv() {
  const file = resolve(root, '.env')
  if (!existsSync(file)) {
    console.error('Missing .env in the project root. Copy .env.example to .env and fill it in.')
    process.exit(1)
  }
  const env = {}
  for (const raw of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    env[line.slice(0, eq).trim()] = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
  }
  return env
}

const env = loadEnv()
const key = env.FISH_API_KEY
const voice = env.FISH_VOICE_ID
const models = (env.FISH_MODELS || 's1').split(',').map((m) => m.trim()).filter(Boolean)

if (!key || !voice) {
  console.error('FISH_API_KEY and FISH_VOICE_ID must be set in .env')
  process.exit(1)
}

let lastError = ''
for (const model of models) {
  console.log(`Trying Fish Audio model "${model}"…`)
  try {
    const res = await fetch('https://api.fish.audio/v1/tts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        model,
      },
      body: JSON.stringify({ text: TEXT, reference_id: voice, format: 'mp3' }),
    })
    if (!res.ok) {
      lastError = `${res.status} ${await res.text()}`
      console.warn(`  failed: ${lastError.slice(0, 200)}`)
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    const outDir = resolve(root, 'public/assets')
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
    writeFileSync(resolve(outDir, 'greeting.mp3'), buf)
    console.log(`Saved public/assets/greeting.mp3 (${Math.round(buf.length / 1024)} KB) using "${model}".`)
    process.exit(0)
  } catch (err) {
    lastError = String(err)
    console.warn(`  failed: ${lastError}`)
  }
}

console.error(`All models failed. Last error: ${lastError}`)
process.exit(1)
