// app/dash/page.tsx
'use client';

import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('./components/dash'), {
  loading: () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-pulse text-gray-600">Cargando dashboard...</div>
    </div>
  )
});

export default function DashboardPage() {
  return <Dashboard />;
}