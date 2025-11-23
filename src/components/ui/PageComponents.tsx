import {
  Container,
  Title,
  Text,
  Box,
  Group,
  Stack,
  ThemeIcon,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  color?: string;
  compact?: boolean;
}

export function PageHeader({ title, description, icon, color = 'blue', compact = false }: PageHeaderProps) {
  const theme = useMantineTheme();

  return (
    <Container size='lg' mb={compact ? '1rem' : '3rem'}>
      <Box
        py={compact ? 'lg' : { base: 'xl', md: '3rem' }}
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `linear-gradient(135deg, ${theme.colors[color][9]} 0%, ${theme.colors[color][6]} 100%)`,
          color: 'white',
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadows.md,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circle */}
        <Box
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            pointerEvents: 'none',
          }}
        />

        <Container size='lg' style={{ position: 'relative', zIndex: 1 }}>
          <Group align='flex-start' wrap='nowrap'>
            {icon && (
              <ThemeIcon
                size={compact ? rem(40) : rem(64)}
                radius='md'
                variant='white'
                color={color}
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                {icon}
              </ThemeIcon>
            )}
            <Stack gap='xs' style={{ flex: 1 }}>
              <Title order={1} style={{ color: 'white', fontSize: compact ? rem(20) : rem(32) }}>
                {title}
              </Title>
              <Text
                size={compact ? 'sm' : 'lg'}
                style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 650, lineHeight: 1.5 }}
              >
                {description}
              </Text>
            </Stack>
          </Group>
        </Container>
      </Box>
    </Container>
  );
}

interface PageSectionProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  delay?: number;
}

export function PageSection({ title, description, icon, children, delay = 0 }: PageSectionProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      mb='xl'
    >
      {(title || description || icon) && (
        <Group mb='md' align="flex-start">
          {icon && (
            <ThemeIcon variant="light" size="lg" radius="md">
              {icon}
            </ThemeIcon>
          )}
          <Box style={{ flex: 1 }}>
            {title && (
              <Title order={3} style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                {title}
              </Title>
            )}
            {description && (
              <Text c="dimmed" size="sm">
                {description}
              </Text>
            )}
          </Box>
        </Group>
      )}
      {children}
    </Box>
  );
}

// Alias for backward compatibility if needed, but we should migrate
export const Section = PageSection;
