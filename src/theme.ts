import { createTheme, rem, MantineTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'violet',
  defaultRadius: 'lg',
  fontFamily:
    'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFamilyMonospace:
    'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },

  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },

  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '800',
    sizes: {
      h1: { fontSize: rem(36), lineHeight: '1.2' },
      h2: { fontSize: rem(28), lineHeight: '1.3' },
      h3: { fontSize: rem(22), lineHeight: '1.35' },
      h4: { fontSize: rem(18), lineHeight: '1.45' },
    },
  },

  components: {
    Button: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
        },
      },
    },
    Card: {
      defaultProps: {
        padding: 'xl',
        shadow: 'sm',
        withBorder: true,
        radius: 'lg',
      },
      styles: {
        root: {
          backgroundColor: 'var(--mantine-color-white)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '[data-mantine-color-scheme="dark"] &': {
            backgroundColor: 'var(--mantine-color-dark-6)',
          },
        },
      },
    },
    Paper: {
      defaultProps: {
        shadow: 'xs',
        withBorder: true,
        p: 'xl',
        radius: 'lg',
      },
      styles: {
        root: {
          backgroundColor: 'var(--mantine-color-white)',
          '[data-mantine-color-scheme="dark"] &': {
            backgroundColor: 'var(--mantine-color-dark-6)',
          },
        },
      },
    },
    TextInput: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
      styles: {
        input: {
          backgroundColor: 'var(--mantine-color-white)',
          '[data-mantine-color-scheme="dark"] &': {
            backgroundColor: 'var(--mantine-color-dark-5)',
          },
        },
        label: {
          fontWeight: 600,
          marginBottom: '0.25rem',
        },
      },
    },
    Code: {
      styles: (theme: MantineTheme) => ({
        root: {
          fontWeight: 500,
          fontSize: '0.9em',
          fontFamily: 'JetBrains Mono, monospace',
        },
        block: {
          backgroundColor: 'var(--mantine-color-gray-0)',
          border: '1px solid var(--mantine-color-gray-2)',
          borderRadius: theme.radius.md,
          '[data-mantine-color-scheme="dark"] &': {
            backgroundColor: 'var(--mantine-color-dark-8)',
            border: '1px solid var(--mantine-color-dark-4)',
          },
        },
      }),
    },
    Badge: {
      defaultProps: {
        size: 'md',
        radius: 'xl',
        variant: 'light',
      },
      styles: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.02em',
        },
      },
    },
    Accordion: {
      defaultProps: {
        radius: 'lg',
        variant: 'separated',
      },
      styles: {
        item: {
          backgroundColor: 'var(--mantine-color-white)',
          border: '1px solid var(--mantine-color-gray-3)',
          '[data-mantine-color-scheme="dark"] &': {
            backgroundColor: 'var(--mantine-color-dark-6)',
            border: '1px solid var(--mantine-color-dark-4)',
          },
        },
        control: {
          '&:hover': {
            backgroundColor: 'var(--mantine-color-gray-0)',
            '[data-mantine-color-scheme="dark"] &': {
              backgroundColor: 'var(--mantine-color-dark-5)',
            },
          },
        },
      },
    },
    SegmentedControl: {
      defaultProps: {
        radius: 'xl',
        size: 'sm',
      },
    },
  },
});
