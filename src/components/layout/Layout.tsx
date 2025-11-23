import {
  AppShell,
  Burger,
  Group,
  Title,
  NavLink,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  useMantineTheme,
  Container,
  Text,
  SegmentedControl,
  Center,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHome,
  IconCode,
  IconHash,
  IconLock,
  IconAlertTriangle,
  IconSun,
  IconMoon,
  IconBrandGithub,
} from '@tabler/icons-react';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import pkg from '../../../package.json';

export function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const element = useOutlet();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const theme = useMantineTheme();

  const links = [
    { icon: IconHome, label: 'Home', to: '/', color: 'brand' },
    { icon: IconCode, label: 'Encoding', to: '/encoding', color: 'accentBlue' },
    { icon: IconHash, label: 'Hashing', to: '/hashing', color: 'success' },
    { icon: IconLock, label: 'Encryption', to: '/encryption', color: 'brand' },
    { icon: IconAlertTriangle, label: 'Pitfalls', to: '/pitfalls', color: 'danger' },
  ];

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      label={link.label}
      leftSection={<link.icon size='1.2rem' stroke={1.5} />}
      active={location.pathname === link.to}
      onClick={() => {
        navigate(link.to);
        if (opened) toggle();
      }}
      variant='light'
      color={link.color}
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        marginBottom: 8,
        fontWeight: 500,
        borderLeft:
          location.pathname === link.to
            ? `4px solid ${theme.colors[link.color][6]}`
            : '4px solid transparent',
      }}
    />
  ));

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Container size='xl' h='100%'>
          <Group h='100%' justify='space-between'>
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
              <Group gap='xs' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <IconLock size={28} color='var(--mantine-color-violet-6)' />
                <Title order={3} style={{ letterSpacing: -0.5 }}>
                  Cryptolab
                </Title>
              </Group>
            </Group>

            <Group>
              <SegmentedControl
                value={colorScheme}
                onChange={(value) => setColorScheme(value as 'light' | 'dark')}
                size='xs'
                radius='xl'
                data={[
                  {
                    value: 'light',
                    label: (
                      <Center>
                        <IconSun size={14} stroke={1.5} />
                        <Box ml={5} visibleFrom='xs'>
                          Light
                        </Box>
                      </Center>
                    ),
                  },
                  {
                    value: 'dark',
                    label: (
                      <Center>
                        <IconMoon size={14} stroke={1.5} />
                        <Box ml={5} visibleFrom='xs'>
                          Dark
                        </Box>
                      </Center>
                    ),
                  },
                ]}
              />
              <ActionIcon
                component='a'
                href='https://github.com/daniel-kindl/cryptolab'
                target='_blank'
                variant='default'
                size='lg'
                radius='xl'
                aria-label='GitHub'
              >
                <IconBrandGithub size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar p='md'>
        <Text
          size='xs'
          fw={700}
          c='dimmed'
          mb='md'
          tt='uppercase'
          style={{ letterSpacing: 1, opacity: 0.5 }}
        >
          Menu
        </Text>
        {items}
      </AppShell.Navbar>

      <AppShell.Main
        bg={computedColorScheme === 'dark' ? 'dark.7' : 'gray.0'}
        style={{
          backgroundImage:
            computedColorScheme === 'dark'
              ? 'radial-gradient(#373A40 1px, transparent 1px)'
              : 'radial-gradient(#DEE2E6 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box style={{ flex: 1 }}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {element}
            </motion.div>
          </AnimatePresence>
        </Box>

        <Container size='xl' py='xl' mt='xl'>
          <Text c='dimmed' size='xs' ta='center'>
            Cryptolab • v{pkg.version} • © Daniel Kindl 2025
          </Text>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
