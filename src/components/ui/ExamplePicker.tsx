import { Group, Button, Text, ScrollArea } from '@mantine/core';
import { IconBolt } from '@tabler/icons-react';

interface ExamplePickerProps {
  examples: { label: string; value: string }[];
  onSelect: (value: string) => void;
  currentValue?: string;
  label?: string;
}

export function ExamplePicker({
  examples,
  onSelect,
  currentValue,
  label = 'Try an example:',
}: ExamplePickerProps) {
  return (
    <Group gap='xs' align='center' mb='md'>
      <Text size='sm' fw={500} c='dimmed' style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <IconBolt size={14} /> {label}
      </Text>
      <ScrollArea type='hover' scrollbars='x' style={{ flex: 1 }}>
        <Group gap='xs' wrap='nowrap'>
          {examples.map((ex) => {
            const isActive = currentValue === ex.value;
            return (
              <Button
                key={ex.label}
                variant={isActive ? 'filled' : 'default'}
                color={isActive ? 'violet' : 'gray'}
                size='xs'
                radius='xl'
                onClick={() => onSelect(ex.value)}
                style={{
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  border: isActive ? undefined : '1px solid var(--mantine-color-default-border)',
                }}
              >
                {ex.label}
              </Button>
            );
          })}
        </Group>
      </ScrollArea>
    </Group>
  );
}
