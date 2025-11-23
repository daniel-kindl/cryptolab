import { createTheme, MantineColorsTuple, rem, MantineTheme } from '@mantine/core';

const brand: MantineColorsTuple = [
  "#f4f0ff",
  "#e3d9ff",
  "#c4b2ff",
  "#a689ff",
  "#8a62ff",
  "#7a3eff",   // main shade
  "#692fe0",
  "#5826ba",
  "#462093",
  "#301663"
];

const accentBlue: MantineColorsTuple = [
  "#e9f3ff",
  "#d2e4ff",
  "#a8c7ff",
  "#7aa9ff",
  "#528eff",
  "#3b7bff",   // main
  "#3267dc",
  "#2955b6",
  "#214290",
  "#172e63"
];

const success: MantineColorsTuple = [
  "#e6f9ef",
  "#c6f0db",
  "#93e1bc",
  "#5fd29b",
  "#34c57f",
  "#1bbd70",   // main
  "#139c5b",
  "#0f7b47",
  "#0a5833",
  "#063520"
];

const warning: MantineColorsTuple = [
  "#fff7e6",
  "#ffe9c2",
  "#ffd18a",
  "#ffb955",
  "#ffa12b",
  "#ff910f",   // main
  "#e47a00",
  "#ba6200",
  "#8f4800",
  "#5f3000"
];

const danger: MantineColorsTuple = [
  "#ffe8ea",
  "#ffcbd0",
  "#ff99a3",
  "#ff6a77",
  "#ff4354",
  "#ff293f",   // main
  "#e01a35",
  "#b51329",
  "#8b0c1e",
  "#5b0713"
];

const info: MantineColorsTuple = [
  "#e6f5ff",
  "#c9e6ff",
  "#96ceff",
  "#63b5ff",
  "#3a9fff",
  "#208fff",   // main
  "#1876da",
  "#135db3",
  "#0d4588",
  "#072a57"
];

const surface: MantineColorsTuple = [
  "#f7f7fa",
  "#ececf2",
  "#dedee7",
  "#cdccdc",
  "#bcbad0",
  "#aaa8c3",
  "#9894b4",
  "#7f7b9b",
  "#676383",
  "#474360"
];

export const cryptolabTheme = createTheme({
  colors: {
    brand,
    accentBlue,
    success,
    warning,
    danger,
    info,
    surface,
  },
  primaryColor: 'brand',
  primaryShade: { light: 5, dark: 5 },
  
  other: {
    brandGradient: { from: 'brand.5', to: 'accentBlue.5', deg: 135 },
    pageBgDark: '#111827',
    contentBgDark: '#1f2937',
    pageBgLight: '#f3f4f6',
    contentBgLight: '#ffffff',
    labColors: {
      encoding: { from: 'accentBlue.4', to: 'accentBlue.6' },
      hashing: { from: 'success.4', to: 'success.6' },
      encryption: { from: 'brand.4', to: 'brand.6' },
      pitfalls: { from: 'danger.4', to: 'danger.6' },
    },
  },

  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontFamilyMonospace: "JetBrains Mono, 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(24),
  },

  headings: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontWeight: '700',
    sizes: {
      h1: { fontSize: rem(36), lineHeight: '1.2' },
      h2: { fontSize: rem(28), lineHeight: '1.25' },
      h3: { fontSize: rem(22), lineHeight: '1.25' },
      h4: { fontSize: rem(18), lineHeight: '1.25' },
      h5: { fontSize: rem(16), lineHeight: '1.25' },
      h6: { fontSize: rem(14), lineHeight: '1.25' },
    },
  },

  radius: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
  },
  defaultRadius: 'lg',

  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
    xxl: rem(32),
  },

  shadows: {
    sm: "0 4px 8px rgba(15, 23, 42, 0.25)",
    md: "0 10px 30px rgba(15, 23, 42, 0.35)",
    xs: "0 1px 3px rgba(15, 23, 42, 0.2)",
  },

  components: {
    Button: {
      defaultProps: {
        radius: 'lg',
        size: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
      },
      styles: (theme: MantineTheme) => ({
        root: {
          '[data-mantine-color-scheme="dark"] &': {
            backgroundColor: theme.other.contentBgDark,
            boxShadow: theme.shadows.sm,
          },
          '[data-mantine-color-scheme="light"] &': {
            backgroundColor: theme.other.contentBgLight,
            boxShadow: theme.shadows.xs,
            border: `1px solid #e5e7eb`,
          },
        },
      }),
    },
    Paper: {
      defaultProps: {
        radius: 'lg',
      },
      styles: (theme: MantineTheme) => ({
        root: {
          '[data-mantine-color-scheme="dark"] &': {
            backgroundColor: theme.other.contentBgDark,
            boxShadow: theme.shadows.sm,
          },
          '[data-mantine-color-scheme="light"] &': {
            backgroundColor: theme.other.contentBgLight,
            boxShadow: theme.shadows.xs,
            border: `1px solid #e5e7eb`,
          },
        },
      }),
    },
    Tabs: {
      defaultProps: {
        radius: 'xl',
        color: 'brand',
      },
    },
    SegmentedControl: {
      defaultProps: {
        radius: 'xl',
        color: 'brand',
      },
    },
    Chip: {
      defaultProps: {
        radius: 'xl',
        color: 'brand',
      },
    },
    Badge: {
      defaultProps: {
        radius: 'xl',
      },
    },
  },
});

export function ThemeGlobalStyles() {
  return (
    <style>{`
      body {
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      [data-mantine-color-scheme="dark"] body {
        background-color: #111827;
        color: #f9fafb;
      }
      [data-mantine-color-scheme="light"] body {
        background-color: #f3f4f6;
        color: #111827;
      }
      [data-mantine-color-scheme="dark"] {
        --mantine-color-dimmed: #9ca3af;
      }
      [data-mantine-color-scheme="light"] {
        --mantine-color-dimmed: #6b7280;
      }
    `}</style>
  );
}
