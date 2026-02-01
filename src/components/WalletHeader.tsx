import { AppKitButton } from '@reown/appkit/react';
import { useAccount, useChainId } from 'wagmi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDisconnect } from 'wagmi';

export function WalletHeader() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();

  return (
    <header className="flex min-h-0 shrink-0 flex-wrap items-center justify-between gap-2 border-b bg-card px-3 h-20 sm:flex-nowrap sm:gap-3 sm:px-4 sm:h-16">
      <h1 className="truncate text-base font-semibold sm:text-lg">EIP-712 签名工具</h1>
      <div className="flex w-full shrink-0 flex-wrap items-center justify-between gap-2 sm:gap-3 sm:justify-end">
        {isConnected && address && (
          <>
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              Chain ID: {chainId}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="hidden shrink-0 sm:inline-flex"
              onClick={() => disconnect()}
            >
              断开连接
            </Button>
          </>
        )}
        <div className="shrink-0">
          <AppKitButton size="sm" />
        </div>
      </div>
    </header>
  );
}
