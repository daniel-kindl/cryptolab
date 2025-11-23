/**
 * Home
 * Landing page with guided learning paths and feature overview.
 * Routing hub for the application.
 */
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  rem,
  Button,
  Group,
  Stack,
  Badge,
  Timeline,
} from '@mantine/core';
import {
  IconCode,
  IconHash,
  IconLock,
  IconAlertTriangle,
  IconArrowRight,
  IconSchool,
  IconBug,
  IconBook,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Encoding',
      description:
        'Learn how text is represented in bytes, Base64, and URL encoding. Understand that encoding is NOT encryption.',
      icon: IconCode,
      color: 'blue',
      to: '/encoding',
      badge: 'Basics',
    },
    {
      title: 'Hashing',
      description:
        'Explore MD5, SHA-1, and SHA-256. Visualize the avalanche effect and understand password hashing.',
      icon: IconHash,
      color: 'green',
      to: '/hashing',
      badge: 'Integrity',
    },
    {
      title: 'Encryption',
      description:
        'Experiment with Caesar and XOR ciphers. See how AES works and why ECB mode is dangerous.',
      icon: IconLock,
      color: 'violet',
      to: '/encryption',
      badge: 'Confidentiality',
    },
    {
      title: 'Pitfalls',
      description:
        'See common security mistakes in action, like using Base64 for "security" or unsalted hashes.',
      icon: IconAlertTriangle,
      color: 'red',
      to: '/pitfalls',
      badge: 'Security',
    },
  ];

  return (
    <Container size='lg' py='xl'>
      {/* Hero Section */}
      <Stack align='center' gap='xl' my={80} ta='center'>
        <Badge size='lg' variant='gradient' gradient={{ from: 'violet', to: 'cyan' }}>
          Interactive Crypto Education
        </Badge>
        <Title order={1} size={rem(56)} style={{ lineHeight: 1.1, fontWeight: 900, maxWidth: 720 }}>
          Master the Basics of <br />
          <Text span inherit variant='gradient' gradient={{ from: 'violet', to: 'cyan' }}>
            Cryptography
          </Text>
        </Title>
        <Text size='xl' c='dimmed' maw={600}>
          Stop confusing Encoding, Hashing, and Encryption. Explore interactive labs to visualize
          how data is transformed and secured.
        </Text>
        <Group mt='md'>
          <Button
            size='lg'
            color='violet'
            rightSection={<IconArrowRight size={18} />}
            onClick={() => navigate('/encoding?scenario=emoji')}
          >
            Start Learning
          </Button>
          <Button size='lg' variant='default' onClick={() => navigate('/hashing')}>
            Explore Labs
          </Button>
        </Group>
      </Stack>

      {/* Features Grid */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl' mt={80}>
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              shadow='sm'
              padding='xl'
              radius='lg'
              withBorder
              style={{ cursor: 'pointer', height: '100%' }}
              onClick={() => navigate(feature.to)}
              component={motion.div}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Group justify='space-between' mb='md'>
                <ThemeIcon size={48} radius='md' variant='light' color={feature.color}>
                  <feature.icon style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
                </ThemeIcon>
                <Badge variant='light' color={feature.color} size='md' radius='xl'>
                  {feature.badge}
                </Badge>
              </Group>

              <Title order={3} mb='sm'>
                {feature.title}
              </Title>
              <Text c='dimmed' mb='lg'>
                {feature.description}
              </Text>

              <Group mt='auto'>
                <Text
                  c={feature.color}
                  fw={600}
                  size='sm'
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  Open Lab <IconArrowRight size={14} />
                </Text>
              </Group>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>

      {/* Guided Paths Section */}
      <Stack mt={100} gap='xl'>
        <Title order={2} ta='center'>
          Guided Learning Paths
        </Title>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl'>
          <Card p='xl' radius='lg' withBorder>
            <Group mb='lg'>
              <ThemeIcon size='lg' radius='xl' color='blue' variant='light'>
                <IconSchool />
              </ThemeIcon>
              <Title order={3}>The Absolute Beginner</Title>
            </Group>
            <Timeline active={0} bulletSize={28} lineWidth={3}>
              <Timeline.Item title='Encoding Lab' bullet={<IconCode size={14} />}>
                <Text c='dimmed' size='sm'>
                  Learn how computers store text as bytes.
                </Text>
              </Timeline.Item>
              <Timeline.Item title='Hashing Lab' bullet={<IconHash size={14} />}>
                <Text c='dimmed' size='sm'>
                  Understand digital fingerprints.
                </Text>
              </Timeline.Item>
              <Timeline.Item title='Encryption Lab' bullet={<IconLock size={14} />}>
                <Text c='dimmed' size='sm'>
                  See how secrets are kept.
                </Text>
              </Timeline.Item>
            </Timeline>
            <Button
              variant='filled'
              color='blue'
              fullWidth
              mt='xl'
              onClick={() => navigate('/encoding?scenario=emoji')}
            >
              Start Path
            </Button>
          </Card>

          <Card p='xl' radius='lg' withBorder>
            <Group mb='lg'>
              <ThemeIcon size='lg' radius='xl' color='red' variant='light'>
                <IconBug />
              </ThemeIcon>
              <Title order={3}>The Developer</Title>
            </Group>
            <Timeline active={0} bulletSize={28} lineWidth={3} color='red'>
              <Timeline.Item title='Pitfalls' bullet={<IconAlertTriangle size={14} />}>
                <Text c='dimmed' size='sm'>
                  See what NOT to do first.
                </Text>
              </Timeline.Item>
              <Timeline.Item title='Hashing Lab' bullet={<IconHash size={14} />}>
                <Text c='dimmed' size='sm'>
                  Learn proper password storage (Salting).
                </Text>
              </Timeline.Item>
              <Timeline.Item title='Encryption Lab' bullet={<IconLock size={14} />}>
                <Text c='dimmed' size='sm'>
                  Understand AES modes (ECB vs CBC).
                </Text>
              </Timeline.Item>
            </Timeline>
            <Button
              variant='filled'
              color='red'
              fullWidth
              mt='xl'
              onClick={() => navigate('/pitfalls?scenario=base64-fallacy')}
            >
              Start Path
            </Button>
          </Card>
        </SimpleGrid>
      </Stack>


      {/* Quick Glossary */}
      <Stack mt={100} mb={50} gap='xl'>
        <Group justify='center'>
          <IconBook size={32} />
          <Title order={2}>Quick Glossary</Title>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing='lg'>
          {[
            { term: 'Plaintext', def: 'The original, readable message.' },
            { term: 'Ciphertext', def: 'The scrambled, unreadable message.' },
            { term: 'Salt', def: 'Random data added to passwords before hashing.' },
            { term: 'IV', def: 'Initialization Vector. Random start value for block ciphers.' },
          ].map((item) => (
            <Card key={item.term} p='md' withBorder radius='md' shadow='xs'>
              <Text fw={700} c='violet' tt='uppercase' size='sm' mb={4}>
                {item.term}
              </Text>
              <Text size='sm' c='dimmed' lh={1.4}>
                {item.def}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
