import { useAccount, useChainId, useChains, useSwitchChain } from 'wagmi';

/**
 * EVM 链选择器。连接钱包后展示当前链，切换时调用 wagmi 的 switchChain
 * 让钱包（如 MetaMask）确认切链。未连接时隐藏。
 */
export function ChainSwitch() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const chains = useChains();

  if (!isConnected) {
    return null;
  }

  const active = chains.find((c) => c.id === chainId);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = Number(event.target.value);
    if (next !== chainId) {
      switchChain({ chainId: next });
    }
  };

  return (
    <select
      value={chainId}
      onChange={handleChange}
      className="h-8 shrink-0 rounded-lg border border-border bg-muted px-2 py-1 text-[10px] text-muted-foreground sm:h-9 sm:text-xs"
      title={active?.name}
    >
      {chains.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
