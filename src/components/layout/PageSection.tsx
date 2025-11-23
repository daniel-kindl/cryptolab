import React from 'react';
import { Paper, Title, Text, Group, Stack, ThemeIcon, useMantineTheme, Box } from '@mantine/core';
import { motion } from 'framer-motion';

interface PageSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  delay?: number;
}

export function PageSection({
  title,
  description,
  icon,
  children,
  action,
  delay = 0,
}: PageSectionProps) {
  const theme = useMantineTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      mb='xl'
    >
      <Paper p='xl' withBorder radius='lg'>
        <Stack gap='md'>
          <Group justify='space-between' align='flex-start'>
            <Group>
              {icon && (
                <ThemeIcon size='lg' variant='light' radius='md' color={theme.primaryColor}>
                  {icon}
                </ThemeIcon>
              )}
              <div>
                <Title order={3} size='h4'>
                  {title}
                </Title>
                {description && (
                  <Text c='dimmed' size='sm' mt={4}>
                    {description}
                  </Text>
                )}
              </div>
            </Group>
            {action && <div>{action}</div>}
          </Group>

          <div>{children}</div>
        </Stack>
      </Paper>
    </Box>
  );
}
