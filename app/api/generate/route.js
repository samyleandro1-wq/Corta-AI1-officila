import { NextResponse } from 'next/server';

export async function POST(req) {
  const { duration } = await req.json(); // duração total do vídeo em segundos

  const totalCuts = 10;
  const cutDuration = 60; // 1 minuto
  const gap = Math.floor(duration / totalCuts);

  const cuts = [];
  for (let i = 0; i < totalCuts; i++) {
    const start = i * gap + 10; // começa com 10s de folga
    const end = start + cutDuration;
    if (end > duration) break;
    cuts.push({
      id: i + 1,
      start,
      end,
      label: `${Math.floor(start/60)}:${String(start%60).padStart(2,'0')} - ${Math.floor(end/60)}:${String(end%60).padStart(2,'0')}`
    });
  }

  return NextResponse.json({ cuts });
}
