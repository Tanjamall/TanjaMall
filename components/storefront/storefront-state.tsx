"use client";

import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export function StorefrontLoading() {
  return (
    <div className="store-state-frame" role="status" aria-live="polite">
      <span className="state-sr-only">جاري تحميل المنتجات</span>
      <div className="store-state-header">
        <span className="state-circle" />
        <span className="state-brand" />
        <span className="state-circle" />
        <span className="state-search" />
      </div>
      <div className="store-state-content">
        <span className="state-hero" />
        <span className="state-heading" />
        <div className="state-grid">
          <span /><span /><span /><span />
        </div>
      </div>
    </div>
  );
}

export function StorefrontErrorState({ reset }: { reset: () => void }) {
  return (
    <div className="store-state-frame">
      <div className="store-state-header compact"><strong dir="ltr"><span>Tanja</span>Mall</strong></div>
      <main className="store-error-state">
        <AlertCircle aria-hidden="true" />
        <h1>تعذر تحميل الصفحة</h1>
        <p>تأكد من اتصالك بالإنترنت ثم حاول مرة أخرى.</p>
        <button className="primary-btn" type="button" onClick={reset}><RefreshCw aria-hidden="true" /> إعادة المحاولة</button>
        <Link className="secondary-btn" href="/">العودة للرئيسية</Link>
      </main>
    </div>
  );
}
