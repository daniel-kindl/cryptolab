import { CopyButton as MantineCopyButton, ActionIcon, Tooltip } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';

interface CopyButtonProps {
  value: string;
  timeout?: number;
}

export function CopyButton({ value, timeout = 2000 }: CopyButtonProps) {
  return (
    <MantineCopyButton value={value} timeout={timeout}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position='right'>
          <ActionIcon color={copied ? 'teal' : 'gray'} variant='subtle' onClick={copy}>
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </MantineCopyButton>
  );
}
