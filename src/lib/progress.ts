export type Progress = {points:number;stars:number;activities:number;letters:number;syllables:number;words:number;streak:number;badges:string[];history:{label:string;at:number;score:number}[]};
export const initialProgress:Progress={points:0,stars:0,activities:0,letters:0,syllables:0,words:0,streak:1,badges:[],history:[]};
const KEY='alfabetizacao-progress-v2';
export const loadProgress=():Progress=>{try{return {...initialProgress,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return initialProgress}};
export const saveProgress=(p:Progress)=>localStorage.setItem(KEY,JSON.stringify(p));
export function reward(p:Progress,label:string,score=10):Progress{
 const activities=p.activities+1, points=p.points+score, stars=p.stars+1;
 const badges=[...p.badges]; if(activities>=1&&!badges.includes('primeira'))badges.push('primeira'); if(activities>=10&&!badges.includes('super'))badges.push('super'); if(p.letters>=9&&!badges.includes('letras'))badges.push('letras');
 return {...p,activities,points,stars,badges,history:[{label,at:Date.now(),score},...p.history].slice(0,30)};
}
