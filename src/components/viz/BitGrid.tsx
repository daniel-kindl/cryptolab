import { SimpleGrid, Box, Tooltip } from '@mantine/core';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface BitGridProps {
  bits: boolean[]; // true = difference, false = same (or just 1/0 values depending on usage)
  label?: string;
}

const BitCell = memo(({ bit, index }: { bit: boolean; index: number }) => (
  <Tooltip
    label={`Bit ${index}: ${bit ? 'Changed' : 'Same'}`}
    openDelay={500}
    transitionProps={{ duration: 0 }}
  >
    <Box
      component={motion.div}
      initial={false}
      animate={{
        backgroundColor: bit ? 'var(--mantine-color-red-6)' : 'var(--mantine-color-gray-2)',
        scale: bit ? [1, 1.1, 1] : 1,
        opacity: bit ? 1 : 0.4,
        borderRadius: bit ? '50%' : '2px',
      }}
      transition={{ duration: 0.3 }}
      style={{
        width: '100%',
        paddingBottom: '100%',
      }}
    />
  </Tooltip>
));

export const BitGrid = memo(function BitGrid({ bits }: BitGridProps) {
  // Limit to first 256 bits (32 bytes) for visualization sanity if hash is long
  const displayBits = bits.slice(0, 256);

  return (
    <SimpleGrid cols={16} spacing={2} verticalSpacing={2}>
      {displayBits.map((bit, index) => (
        <BitCell key={index} bit={bit} index={index} />
      ))}
    </SimpleGrid>
  );
});
