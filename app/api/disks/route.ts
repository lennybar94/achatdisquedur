/* ------------------------------------------------------------------ */
/*  Fusionne HDD/SSD + Clés USB + Cartes mémoire en une seule liste   */
/* ------------------------------------------------------------------ */
import { NextResponse } from 'next/server';
import hdd   from '../../../data/manualProducts.json';
import usb   from '../../../data/manualUSB.json';
import cards from '../../../data/manualCM.json';

export function GET() {
  const merged = [...hdd, ...usb, ...cards];
  return NextResponse.json(merged, {
    headers: { 'Cache-Control': 'public, max-age=3600' }
  });
}