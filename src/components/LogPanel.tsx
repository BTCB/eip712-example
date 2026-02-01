import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface LogEntry {
  time: string;
  level: 'info' | 'success' | 'error';
  message: string;
  detail?: unknown;
}

export interface LogPanelProps {
  entries: LogEntry[];
  className?: string;
}

export function LogPanel({ entries, className }: LogPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [entries.length]);

  return (
    <div className={cn('flex flex-col rounded-lg border bg-muted/30', className)}>
      <div className="border-b px-2 py-1.5 text-xs font-medium sm:px-3 sm:py-2 sm:text-sm">
        日志
      </div>
      <ScrollArea className="h-[180px] flex-1 sm:h-[220px]">
        <div
          ref={scrollRef}
          className="h-full overflow-auto px-2 py-1.5 font-mono text-[10px] sm:px-3 sm:py-2 sm:text-xs"
        >
          {entries.length === 0 ? (
            <div className="text-muted-foreground">暂无日志，签名后将在此显示</div>
          ) : (
            <ul className="space-y-1.5">
              {entries.map((e, i) => (
                <li key={i} className="flex flex-col gap-0.5 break-all">
                  <span className="text-muted-foreground">{e.time}</span>
                  <span
                    className={cn(
                      e.level === 'error' && 'text-destructive',
                      e.level === 'success' && 'text-green-600 dark:text-green-400',
                      e.level === 'info' && 'text-foreground'
                    )}
                  >
                    [{e.level}] {e.message}
                  </span>
                  {e.detail != null && (
                    <pre className="overflow-x-auto rounded bg-muted p-1.5 text-[11px]">
                      {JSON.stringify(e.detail, null, 2)}
                    </pre>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
