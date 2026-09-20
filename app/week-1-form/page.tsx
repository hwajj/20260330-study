'use client';
import { useMemo, useState } from 'react';
import { Validator } from '@labs/form/Validator';

type SignupForm = {
  email: string;
  password: string;
  confirm: string;
};

const configs = {
  email: {
    isValid: (f: SignupForm) => /\S+@\S+\.\S+/.test(f.email),
    errorMessage: '이메일 형식이 올바르지 않습니다',
  },
  password: {
    isValid: (f: SignupForm) => f.password.length >= 8,
    errorMessage: '비밀번호는 8자 이상이어야 합니다',
  },
  confirm: {
    isValid: (f: SignupForm) => f.password === f.confirm,
    // 의존 필드 없으면 무시하여 “쓸데없는 에러” 방지
    ignoreWhen: (f: SignupForm) => !f.password,
    errorMessage: '비밀번호가 일치하지 않습니다',
  },
} satisfies Record<
  string,
  {
    isValid: (f: SignupForm) => boolean;
    errorMessage: string;
    ignoreWhen?: (f: SignupForm) => boolean;
  }
>;

const validator = new Validator<typeof configs, SignupForm>(configs);

export default function Week1FormPage() {
  const [form, setForm] = useState<SignupForm>({ email: '', password: '', confirm: '' });
  const result = useMemo(() => validator.checkAll(form), [form]);
  const firstError = result.isValid ? '' : result.getFirstError();

  return (
    <main>
      <h1>Week 1 — Validator 실습</h1>
      <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>이메일</span>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>비밀번호</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="8자 이상"
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>비밀번호 확인</span>
          <input
            type="password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            placeholder="비밀번호 재입력"
          />
        </label>

        {!result.isValid && (
          <div style={{ color: 'crimson', fontWeight: 600 }}>{firstError}</div>
        )}

        <button
          disabled={!result.isValid}
          onClick={() => alert('제출!')}
          style={{ padding: '8px 12px' }}
        >
          제출
        </button>
      </div>
    </main>
  );
}

