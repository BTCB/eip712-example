import { useCallback, useState } from 'react';
import { useAccount, useSignTypedData } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JsonEditor } from '@/components/JsonEditor';
import { EXAMPLE_TEMPLATES } from '@/data/templates';
import type { SignMethod, TypedDataParams } from '@/types/eip712';
import type { LogEntry } from './LogPanel';

const SIGN_METHODS: SignMethod[] = [
  'eth_signTypedData',
  'eth_signTypedData_v3',
  'eth_signTypedData_v4',
];

export interface SignPanelProps {
  onLog: (entry: LogEntry) => void;
}

function parseTypedDataJson(json: string): TypedDataParams | null {
  try {
    const raw = JSON.parse(json) as {
      domain?: Record<string, unknown>;
      types?: Record<string, Array<{ name: string; type: string }>>;
      primaryType?: string;
      message?: Record<string, unknown>;
    };
    if (
      !raw ||
      typeof raw.domain !== 'object' ||
      typeof raw.types !== 'object' ||
      typeof raw.primaryType !== 'string' ||
      typeof raw.message !== 'object'
    ) {
      return null;
    }
    return {
      domain: raw.domain as TypedDataParams['domain'],
      types: raw.types,
      primaryType: raw.primaryType,
      message: raw.message as TypedDataParams['message'],
    };
  } catch {
    return null;
  }
}

export function SignPanel({ onLog }: SignPanelProps) {
  const [activeMethod, setActiveMethod] = useState<SignMethod>('eth_signTypedData_v4');
  const [editorValue, setEditorValue] = useState(() => {
    const t = EXAMPLE_TEMPLATES.find((x) => x.method === 'eth_signTypedData_v4');
    return t?.json ?? '{}';
  });
  const [jsonValid, setJsonValid] = useState(true);

  const { address, isConnected } = useAccount();
  const { signTypedDataAsync, isPending: isSigning } = useSignTypedData();

  const fillTemplate = useCallback((method: SignMethod) => {
    setActiveMethod(method);
    const t = EXAMPLE_TEMPLATES.find((x) => x.method === method);
    if (t) setEditorValue(t.json);
  }, []);

  const applyTemplate = useCallback((t: (typeof EXAMPLE_TEMPLATES)[number]) => {
    setEditorValue(t.json);
  }, []);

  const handleSign = useCallback(async () => {
    if (!isConnected || !address) {
      onLog({
        time: new Date().toISOString(),
        level: 'error',
        message: '请先连接钱包',
      });
      return;
    }
    if (!jsonValid) {
      onLog({
        time: new Date().toISOString(),
        level: 'error',
        message: 'JSON 格式无效，请修正后再签名',
      });
      return;
    }

    const params = parseTypedDataJson(editorValue);
    if (!params) {
      onLog({
        time: new Date().toISOString(),
        level: 'error',
        message: '无法解析为 EIP-712 结构化数据（需包含 domain、types、primaryType、message）',
      });
      return;
    }

    onLog({
      time: new Date().toISOString(),
      level: 'info',
      message: `开始签名，方法: ${activeMethod}`,
      detail: { domain: params.domain, primaryType: params.primaryType },
    });

    try {
      const signature = await signTypedDataAsync({
        domain: params.domain,
        types: params.types,
        primaryType: params.primaryType,
        message: params.message,
      });

      onLog({
        time: new Date().toISOString(),
        level: 'success',
        message: '签名成功',
        detail: { signature, method: activeMethod },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      onLog({
        time: new Date().toISOString(),
        level: 'error',
        message: '签名失败',
        detail: { error: msg },
      });
    }
  }, [isConnected, address, signTypedDataAsync, jsonValid, editorValue, activeMethod, onLog]);

  return (
    <div className="space-y-3 sm:space-y-4">
      <Tabs
        value={activeMethod}
        onValueChange={(v) => {
          const m = v as SignMethod;
          setActiveMethod(m);
          fillTemplate(m);
        }}
      >
        <TabsList className="flex h-auto w-full flex-wrap gap-1 rounded-lg bg-muted p-1 sm:grid sm:grid-cols-3 sm:flex-nowrap">
          {SIGN_METHODS.map((method) => (
            <TabsTrigger
              key={method}
              value={method}
              className="flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:flex-none sm:px-3 sm:py-1 sm:text-sm"
            >
              {method === 'eth_signTypedData'
                ? 'v1'
                : method === 'eth_signTypedData_v3'
                  ? 'v3'
                  : 'v4'}
            </TabsTrigger>
          ))}
        </TabsList>
        {SIGN_METHODS.map((method) => (
          <TabsContent key={method} value={method} className="mt-3 sm:mt-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {EXAMPLE_TEMPLATES.filter((t) => t.method === method).map((t) => (
                <Button
                  key={t.label}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => applyTemplate(t)}
                >
                  填充示例: {t.label}
                </Button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <JsonEditor
        value={editorValue}
        onChange={setEditorValue}
        onValidationChange={setJsonValid}
        height={280}
        className="min-h-[200px] sm:min-h-[280px]"
      />

      <div className="flex justify-end">
        <Button
          className="w-full sm:w-auto"
          onClick={handleSign}
          disabled={!isConnected || !jsonValid || isSigning}
        >
          {isSigning ? '签名中…' : '使用钱包签名'}
        </Button>
      </div>
    </div>
  );
}
