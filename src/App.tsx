import { useCallback, useState } from 'react';
import { WalletHeader } from '@/components/WalletHeader';
import { SignPanel } from '@/components/SignPanel';
import { LogPanel } from '@/components/LogPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LogEntry } from '@/components/LogPanel';

export function App() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const handleLog = useCallback((entry: LogEntry) => {
    setLogs((prev) => [...prev.slice(-99), entry]);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground safe-area-inset">
      <WalletHeader />
      <main className="mx-auto max-w-4xl space-y-4 px-3 py-4 sm:space-y-6 sm:p-6">
        <Card className="overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">EIP-712 结构化数据签名</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <SignPanel onLog={handleLog} />
          </CardContent>
        </Card>
        <LogPanel entries={logs} />
      </main>
    </div>
  );
}
