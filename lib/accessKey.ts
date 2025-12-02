import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';

// 암호키 타입
export interface AccessKey {
  key: string;
  createdAt: Date;
  usedAt?: Date;
  used: boolean;
  usedBy?: string;
}

// 관리자 비밀번호
export const ADMIN_PASSWORD = '01046975590';

// 마스터키 (항상 사용 가능)
export const MASTER_KEY = '20031123';

// 랜덤 키 생성 (8자리)
export function generateKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let key = '';
  for (let i = 0; i < 8; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

// 암호키 발급
export async function createAccessKey(): Promise<string> {
  const key = generateKey();
  const keyRef = doc(db, 'accessKeys', key);
  
  await setDoc(keyRef, {
    key,
    createdAt: serverTimestamp(),
    used: false,
  });
  
  return key;
}

// 암호키 검증
export async function validateAccessKey(key: string): Promise<boolean> {
  const keyRef = doc(db, 'accessKeys', key.toUpperCase());
  const keyDoc = await getDoc(keyRef);
  
  if (!keyDoc.exists()) {
    return false;
  }
  
  const data = keyDoc.data();
  return !data.used;
}

// 암호키 사용 처리
export async function useAccessKey(key: string): Promise<boolean> {
  const keyRef = doc(db, 'accessKeys', key.toUpperCase());
  const keyDoc = await getDoc(keyRef);
  
  if (!keyDoc.exists()) {
    return false;
  }
  
  const data = keyDoc.data();
  if (data.used) {
    return false;
  }
  
  await updateDoc(keyRef, {
    used: true,
    usedAt: serverTimestamp(),
  });
  
  return true;
}

// 모든 암호키 조회 (관리자용)
export async function getAllAccessKeys(): Promise<AccessKey[]> {
  const keysRef = collection(db, 'accessKeys');
  const snapshot = await getDocs(keysRef);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      key: data.key,
      createdAt: data.createdAt?.toDate() || new Date(),
      usedAt: data.usedAt?.toDate(),
      used: data.used,
      usedBy: data.usedBy,
    };
  });
}

// 암호키 삭제 (관리자용)
export async function deleteAccessKey(key: string): Promise<void> {
  const keyRef = doc(db, 'accessKeys', key);
  await deleteDoc(keyRef);
}