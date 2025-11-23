import { Alert } from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface DetailedNoteProps {
  children: ReactNode;
  title?: string;
}

export function DetailedNote({ children, title = 'Educator Note' }: DetailedNoteProps) {
  return (
    <Alert
      icon={<IconSchool size={16} />}
      title={title}
      color='violet'
      variant='light'
      mt='md'
      mb='md'
      styles={{
        title: { fontSize: '0.9rem' },
        message: { fontSize: '0.9rem' },
      }}
    >
      {children}
    </Alert>
  );
}
