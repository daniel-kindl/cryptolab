import { Code, Text, Group, Tooltip, ActionIcon } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

interface ByteVisualizerProps {
  bytes: Uint8Array;
  label?: string;
  showBinary?: boolean;
}

export function ByteVisualizer({ bytes, label, showBinary = false }: ByteVisualizerProps) {
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
    .join(' ');

  const binary = showBinary
    ? Array.from(bytes)
        .map((b) => b.toString(2).padStart(8, '0'))
        .join(' ')
    : null;

  return (
    <div>
      {label && (
        <Group gap={4} mb={4}>
          <Text size='xs' fw={700} c='dimmed' tt='uppercase'>
            {label}
          </Text>
          <Text size='xs' c='dimmed'>
            ({bytes.length} bytes)
          </Text>
        </Group>
      )}
      <Code block style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
        {hex}
      </Code>
      {showBinary && (
        <>
          <Text size='xs' fw={700} c='dimmed' tt='uppercase' mt='xs' mb={4}>
            Binary
          </Text>
          <Code block style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {binary}
          </Code>
        </>
      )}
    </div>
  );
}

interface ExplanationTooltipProps {
  label: string;
}

export function ExplanationTooltip({ label }: ExplanationTooltipProps) {
  return (
    <Tooltip label={label} multiline w={220} withArrow>
      <ActionIcon variant='subtle' color='gray' size='sm' radius='xl'>
        <IconInfoCircle size={14} />
      </ActionIcon>
    </Tooltip>
  );
}
