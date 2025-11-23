import { SegmentedControl, Text, Group } from '@mantine/core';
import { IconSchool, IconBook } from '@tabler/icons-react';

interface EducatorToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function EducatorToggle({ value, onChange }: EducatorToggleProps) {
  return (
    <Group gap='xs'>
      <Text size='xs' fw={500} c='dimmed'>
        Explanation Density:
      </Text>
      <SegmentedControl
        size='xs'
        value={value ? 'detailed' : 'concise'}
        onChange={(val) => onChange(val === 'detailed')}
        data={[
          {
            value: 'concise',
            label: (
              <Group gap={4}>
                <IconBook size={12} />
                <Text size='xs'>Concise</Text>
              </Group>
            ),
          },
          {
            value: 'detailed',
            label: (
              <Group gap={4}>
                <IconSchool size={12} />
                <Text size='xs'>Educator</Text>
              </Group>
            ),
          },
        ]}
      />
    </Group>
  );
}
