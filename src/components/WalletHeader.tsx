import { AppKitButton } from '@reown/appkit/react';
import { ChainSwitch } from '@/components/ChainSwitch';
import { Button } from '@/components/ui/button';
import { useAccount, useDisconnect } from 'wagmi';

export function WalletHeader() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <header className="flex min-h-0 shrink-0 flex-wrap items-center justify-between gap-2 border-b bg-card px-3 h-20 sm:flex-nowrap sm:gap-3 sm:px-4 sm:h-16">
      <h1 className="truncate text-base font-semibold sm:text-lg">EIP-712 签名工具</h1>
      <div className="flex w-full shrink-0 flex-wrap items-center justify-between gap-2 sm:gap-3 sm:justify-end">
        {isConnected && address && <ChainSwitch />}
        {isConnected && (
          <Button
            variant="outline"
            size="sm"
            className="hidden shrink-0 sm:inline-flex"
            onClick={() => disconnect()}
          >
            断开连接
          </Button>
        )}
        <div className="shrink-0">
          <AppKitButton size="sm" />
        </div>
      </div>
    </header>
  );
}
