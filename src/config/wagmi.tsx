import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import type { AppKitNetwork } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import type { ReactNode } from 'react';

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const metadata = {
  name: 'EIP-712 签名工具',
  description: '基于 EIP-712 的结构化数据签名',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://example.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet as AppKitNetwork];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: { analytics: false },
});

export function AppKitProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
