/**
 * 카카오 오픈빌더 스킬 요청/응답 어댑터 (스텁).
 * 실연동 시 필드명은 공식 문서에 맞게 extract/toKakao만 수정.
 * @see docs/KAKAO-SETUP.md
 */

export type KakaoExtract = {
  text: string;
  userKey: string | null;
};

/** 오픈빌더식 body 또는 단순 { utterance } / { message } 모두 허용 */
export function extractKakaoText(body: unknown): KakaoExtract {
  const b = (body ?? {}) as Record<string, unknown>;
  const userRequest = b.userRequest as Record<string, unknown> | undefined;
  const utterance =
    (typeof userRequest?.utterance === "string" && userRequest.utterance) ||
    (typeof b.utterance === "string" && b.utterance) ||
    (typeof b.message === "string" && b.message) ||
    (typeof b.text === "string" && b.text) ||
    "";

  const user = userRequest?.user as Record<string, unknown> | undefined;
  const userKey =
    (typeof user?.id === "string" && user.id) ||
    (typeof user?.properties === "object" &&
      user.properties &&
      typeof (user.properties as { botUserKey?: string }).botUserKey === "string" &&
      (user.properties as { botUserKey: string }).botUserKey) ||
    (typeof b.userKey === "string" && b.userKey) ||
    null;

  return { text: utterance.trim(), userKey };
}

/** 오픈빌더 스킬 응답 골격 (버전·템플릿). 실스펙과 다를 수 있음 — 참고용 */
export function toKakaoSkillResponse(opts: {
  text: string;
  sessionId?: string;
  needsConfirm?: boolean;
  downloadUrl?: string;
}) {
  const buttons: { action: string; label: string; messageText?: string; webLinkUrl?: string }[] =
    [];
  if (opts.needsConfirm && opts.sessionId) {
    buttons.push({
      action: "message",
      label: "확인 · 엑셀 생성",
      messageText: `확인 ${opts.sessionId}`,
    });
  }
  if (opts.downloadUrl) {
    buttons.push({
      action: "webLink",
      label: "정산서 다운로드",
      webLinkUrl: opts.downloadUrl,
    });
  }

  return {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: opts.text,
          },
        },
      ],
      ...(buttons.length
        ? {
            quickReplies: buttons.map((btn) => ({
              action: btn.action,
              label: btn.label,
              ...(btn.messageText ? { messageText: btn.messageText } : {}),
              ...(btn.webLinkUrl ? { webLinkUrl: btn.webLinkUrl } : {}),
            })),
          }
        : {}),
    },
    // 디버그·웹 연동용 (카카오가 무시해도 됨)
    extra: {
      sessionId: opts.sessionId ?? null,
      needsConfirm: Boolean(opts.needsConfirm),
    },
  };
}
