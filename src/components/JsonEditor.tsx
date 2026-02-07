import { useCallback, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { Button } from '@/components/ui/button';
import {
  Maximize2,
  Minimize2,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  ClipboardPaste,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (valid: boolean, error?: string) => void;
  height?: number;
  className?: string;
}

const EDITOR_HEIGHT_MOBILE = 220;
const EDITOR_HEIGHT_DESKTOP = 320;

export function JsonEditor({
  value,
  onChange,
  onValidationChange,
  height = EDITOR_HEIGHT_DESKTOP,
  className,
}: JsonEditorProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorMount = useCallback((editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  }, []);

  const validateAndNotify = useCallback(
    (raw: string) => {
      if (!raw.trim()) {
        setEditorError(null);
        onValidationChange?.(true);
        return;
      }
      try {
        JSON.parse(raw);
        setEditorError(null);
        onValidationChange?.(true);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Invalid JSON';
        setEditorError(msg);
        onValidationChange?.(false, msg);
      }
    },
    [onValidationChange]
  );

  const handleChange = useCallback(
    (newValue: string | undefined) => {
      const v = newValue ?? '';
      onChange(v);
      validateAndNotify(v);
    },
    [onChange, validateAndNotify]
  );

  const format = useCallback(() => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      onChange(formatted);
      setEditorError(null);
      onValidationChange?.(true);
    } catch {
      validateAndNotify(value);
    }
  }, [value, onChange, onValidationChange, validateAndNotify]);

  const exportFile = useCallback(() => {
    const blob = new Blob([value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eip712-typed-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [value]);

  const importFile = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result ?? '');
        onChange(text);
        validateAndNotify(text);
      };
      reader.readAsText(file);
    };
    input.click();
  }, [onChange, validateAndNotify]);

  const clearJson = useCallback(() => {
    const empty = '{}';
    onChange(empty);
    validateAndNotify(empty);
  }, [onChange, validateAndNotify]);

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      const appended = value + text;
      onChange(appended);
      validateAndNotify(appended);
    } catch {
      // Clipboard API may be denied or unavailable
    }
  }, [value, onChange, validateAndNotify]);

  const editorHeight =
    typeof window !== 'undefined' && window.innerWidth < 640 ? EDITOR_HEIGHT_MOBILE : height;

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border bg-background',
        fullscreen && 'fixed inset-2 z-50 rounded-xl sm:inset-4'
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-1 border-b px-2 py-1.5 sm:flex-nowrap">
        <span className="text-muted-foreground text-xs sm:text-sm">TypedData JSON</span>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={format}
            title="Format"
          >
            <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={clearJson}
            title="Clear JSON"
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={pasteFromClipboard}
            title="Paste from clipboard"
          >
            <ClipboardPaste className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={importFile}
            title="Import JSON"
          >
            <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={exportFile}
            title="Export JSON"
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => setFullscreen((f) => !f)}
            title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {fullscreen ? (
              <Minimize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
          </Button>
        </div>
      </div>
      {editorError && (
        <div className="bg-destructive/10 px-2 py-1 text-destructive text-[10px] sm:text-xs">
          {editorError}
        </div>
      )}
      <div
        className={cn('min-h-0 flex-1', className)}
        style={{ height: fullscreen ? undefined : editorHeight }}
      >
        <Editor
          height={fullscreen ? 'calc(100vh - 5rem)' : editorHeight}
          defaultLanguage="json"
          value={value}
          onChange={handleChange}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            lineNumbers: 'on',
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}
