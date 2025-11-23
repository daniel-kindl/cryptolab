import { Group, Stack, Text, Paper, Tooltip } from '@mantine/core';
import { motion } from 'framer-motion';
import { Block, getBlockColor } from '../../crypto/blocks';

interface BlockDiagramProps {
  blocks: Block[];
  label: string;
}

export function BlockDiagram({ blocks, label }: BlockDiagramProps) {
  return (
    <Stack gap='xs'>
      <Text size='sm' fw={600} tt='uppercase' c='dimmed' style={{ letterSpacing: 0.5 }}>
        {label}
      </Text>
      <Group gap='sm' wrap='wrap'>
        {blocks.map((block, index) => (
          <Tooltip key={block.id} label={`Hex: ${block.hex}`} withArrow>
            <Paper
              component={motion.div}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              p='xs'
              radius='md'
              withBorder
              shadow='sm'
              style={{
                backgroundColor: getBlockColor(block.hex),
                width: 64,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default',
                borderWidth: 2,
              }}
            >
              <Text
                size='xs'
                ta='center'
                fw={700}
                style={{ wordBreak: 'break-all', lineHeight: 1, opacity: 0.7 }}
              >
                {block.hex.substring(0, 4)}
              </Text>
            </Paper>
          </Tooltip>
        ))}
      </Group>
    </Stack>
  );
}
