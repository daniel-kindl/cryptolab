import { Text, Group, Code } from '@mantine/core';

interface HexViewProps {
  bytes: Uint8Array;
  label?: string;
}

export function HexView({ bytes, label }: HexViewProps) {
  const hexString = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ');

  return (
    <div>
      {label && (
        <Text fw={500} mb='xs'>
          {label}
        </Text>
      )}
      <Code block style={{ wordBreak: 'break-all' }}>
        {hexString || ' '}
      </Code>
      <Group justify='flex-end' mt='xs'>
        <Text size='xs' c='dimmed'>
          {bytes.length} bytes
        </Text>
      </Group>
    </div>
  );
}
