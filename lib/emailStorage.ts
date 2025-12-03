/**
 * MET Mythic - 이메일 수집 및 저장
 */

import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface EmailRecord {
  email: string;
  archetype: string;
  archetypeName: string;
  figureName: string;
  syncRate: number;
  createdAt: Date;
  source: 'report_download';
}

// 이메일 저장
export async function saveEmail(data: {
  email: string;
  archetype: string;
  archetypeName: string;
  figureName: string;
  syncRate: number;
}): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'emails'), {
      ...data,
      createdAt: serverTimestamp(),
      source: 'report_download',
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving email:', error);
    throw error;
  }
}

export default { saveEmail };