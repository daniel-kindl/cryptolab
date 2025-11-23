/**
 * HashingLab
 * Teaches: Avalanche effect, hash functions, file integrity.
 * Algorithms: MD5 (insecure), SHA-1 (deprecated), SHA-256, SHA-512.
 * NOTE: Do not change crypto behavior here; only UI around src/crypto/hash.ts.
 */
import { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Text,
  TextInput,
  Select,
  Stack,
  Paper,
  Grid,
  Code,
  Group,
  Progress,
  Badge,
  Box,
  FileInput,
  Loader,
  Center,
} from '@mantine/core';
import { IconHash, IconFile } from '@tabler/icons-react';
import {
  computeHash,
  HashAlgorithm,
  compareHashesBits,
  calculateAvalanchePercentage,
} from '../crypto/hash';
import { PageHeader } from '../components/ui/PageComponents';
import { PageSection } from '../components/layout/PageSection';
import { ExamplePicker } from '../components/ui/ExamplePicker';
import { CopyButton } from '../components/ui/CopyButton';
import { EducatorToggle } from '../components/ui/EducatorToggle';
import { DetailedNote } from '../components/ui/DetailedNote';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const BitGrid = lazy(() => import('../components/viz/BitGrid').then(module => ({ default: module.BitGrid })));

export function HashingLab() {
  useDocumentTitle('Hashing & Avalanche Effect — Cryptolab');
  const location = useLocation();
  const [algo, setAlgo] = useState<HashAlgorithm>('SHA-256');
  const [input1, setInput1] = useState('Hello World');
  const [input2, setInput2] = useState('hello world'); // Small difference
  const [scenario, setScenario] = useState<string | null>(null);
  const [showDetailed, setShowDetailed] = useState(false);

  const [hash1, setHash1] = useState('');
  const [hash2, setHash2] = useState('');

  // File Hashing State
  const [file, setFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState('');
  const [isHashingFile, setIsHashingFile] = useState(false);

  // Smart Presets
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const params = new URLSearchParams(location.search);
    const sc = params.get('scenario') || hash;

    if (sc === 'avalanche' || sc === 'avalanche-demo') {
      handleExampleSelect('Avalanche');
    } else if (sc === 'password') {
      handleExampleSelect('Password');
    }
  }, [location]);

  useEffect(() => {
    computeHash(input1, algo).then(setHash1);
  }, [input1, algo]);

  useEffect(() => {
    computeHash(input2, algo).then(setHash2);
  }, [input2, algo]);

  useEffect(() => {
    if (file) {
      setIsHashingFile(true);
      setFileHash('');
      
      // Off-main-thread simulation using setTimeout to unblock UI
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = e.target?.result as string;
          const h = await computeHash(text, 'SHA-256'); // Always use SHA-256 for file demo
          setFileHash(h);
          setIsHashingFile(false);
        };
        reader.readAsText(file);
      }, 100);
    } else {
      setFileHash('');
    }
  }, [file]);

  const diffBits = compareHashesBits(hash1, hash2);
  const percentChanged = calculateAvalanchePercentage(hash1, hash2);

  const examples = [
    { label: 'Avalanche Demo', value: 'Avalanche' },
    { label: 'Password vs P@ssword', value: 'Password' },
    { label: 'Empty String', value: 'Empty' },
  ];

  const handleExampleSelect = (val: string) => {
    setScenario(val);
    if (val === 'Avalanche') {
      setInput1('The quick brown fox jumps over the lazy dog');
      setInput2('The quick brown fox jumps over the lazy dog.');
    } else if (val === 'Password') {
      setInput1('password123');
      setInput2('p@ssword123');
    } else if (val === 'Empty') {
      setInput1('');
      setInput2(' ');
    }
  };

  return (
    <>
      <PageHeader
        title='Hashing Lab'
        description='Hashing is a one-way function that maps data of arbitrary size to fixed-size values. A key property is the Avalanche Effect: a small change in input should result in a drastically different hash.'
        icon={<IconHash size={32} />}
        lab='hashing'
        compact
      />

      <Container size='lg'>
        <Group justify="flex-end" mb="md">
          <EducatorToggle value={showDetailed} onChange={setShowDetailed} />
        </Group>

        <PageSection title='Configuration' delay={0.1}>
          <Stack gap='xs'>
            <Text size='sm' fw={600} c='dimmed' tt='uppercase'>
              Algorithm Selection
            </Text>
            <Group>
              <Select
                value={algo}
                onChange={(v) => setAlgo(v as HashAlgorithm)}
                data={['MD5', 'SHA-1', 'SHA-256', 'SHA-512']}
                maw={200}
              />
              <Text size='sm' c='dimmed'>
                {algo === 'MD5' && 'Broken / insecure; for demo only.'}
                {algo === 'SHA-1' && 'Deprecated for security.'}
                {(algo === 'SHA-256' || algo === 'SHA-512') && 'Modern hash family.'}
              </Text>
            </Group>
          </Stack>
        </PageSection>

        <Box mb="xl">
          <ExamplePicker
            examples={examples}
            onSelect={handleExampleSelect}
            label='Load Scenario:'
            currentValue={scenario || undefined}
          />
        </Box>

        <Grid gutter='xl'>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PageSection title='Input A' delay={0.2}>
              <Stack>
                <TextInput
                  label='Text Input'
                  value={input1}
                  onChange={(e) => setInput1(e.currentTarget.value)}
                />
                <Group justify="space-between" mt="sm">
                  <Text size='sm' fw={500}>
                    Hash Output
                  </Text>
                  <CopyButton value={hash1} />
                </Group>
                <Code
                  block
                  style={{ wordBreak: 'break-all', minHeight: 60, fontSize: '0.85rem' }}
                >
                  {hash1 || 'Computing...'}
                </Code>
              </Stack>
            </PageSection>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <PageSection title='Input B' delay={0.2}>
              <Stack>
                <TextInput
                  label='Text Input (Try changing one character)'
                  value={input2}
                  onChange={(e) => setInput2(e.currentTarget.value)}
                />
                <Group justify="space-between" mt="sm">
                  <Text size='sm' fw={500}>
                    Hash Output
                  </Text>
                  <CopyButton value={hash2} />
                </Group>
                <Code
                  block
                  style={{ wordBreak: 'break-all', minHeight: 60, fontSize: '0.85rem' }}
                >
                  {hash2 || 'Computing...'}
                </Code>
              </Stack>
            </PageSection>
          </Grid.Col>
        </Grid>

        <PageSection title='Avalanche Effect Visualization' delay={0.4}>
          {showDetailed && (
            <DetailedNote title="The Avalanche Effect">
              <Text size="sm">
                In a good hash function, flipping a single bit in the input should flip approximately 50% of the bits in the output. 
                This makes it impossible to predict the input from the output.
              </Text>
            </DetailedNote>
          )}
          <Grid gutter='xl' align='center'>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap='lg'>
                <Box>
                  <Text fw={700} size='lg' mb='xs'>
                    Bit Difference
                  </Text>
                  <Text c='dimmed' size='sm' mb='md'>
                    Percentage of bits that flipped between Hash A and Hash B. Ideally ~50% for a
                    good hash function.
                  </Text>
                  <Group align='center'>
                    <Text size='xl' fw={700} c={percentChanged > 40 ? 'green' : 'orange'}>
                      {percentChanged.toFixed(2)}%
                    </Text>
                    <Badge
                      color={percentChanged > 40 ? 'green' : 'orange'}
                      variant='light'
                      radius='xl'
                    >
                      {percentChanged > 40 ? 'Good Avalanche' : 'Low Change'}
                    </Badge>
                  </Group>
                  <Progress
                    value={percentChanged}
                    color={percentChanged > 40 ? 'green' : 'orange'}
                    size='xl'
                    mt='sm'
                    radius='xl'
                  />
                </Box>

                <Box>
                  <Text size='sm' fw={500}>
                    Legend
                  </Text>
                  <Group gap='xs' mt='xs'>
                    <Badge color='gray' variant='outline' radius='sm'>
                      Same Bit (Square)
                    </Badge>
                    <Badge color='red' variant='filled' radius='xl'>
                      Flipped Bit (Circle)
                    </Badge>
                  </Group>
                </Box>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper withBorder p='md' radius='md' bg='var(--mantine-color-body)'>
                <Text size='sm' mb='sm' fw={500} ta='center' c='dimmed'>
                  First 256 Bits Visualization
                </Text>
                <Box mx='auto' style={{ maxWidth: 500 }}>
                  <Suspense fallback={<Center p="xl"><Loader /></Center>}>
                    <BitGrid bits={diffBits} />
                  </Suspense>
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </PageSection>

        <PageSection title='File Integrity Check' delay={0.5}>
          {showDetailed && (
            <DetailedNote title="Client-Side Hashing">
              <Text size="sm">
                We are hashing this file right here in your browser. It is never uploaded to a server. 
                This is useful for verifying that a downloaded file hasn't been tampered with.
              </Text>
            </DetailedNote>
          )}
          <Group align='flex-start'>
            <FileInput
              label='Select a file to hash (SHA-256)'
              placeholder='Click to upload...'
              leftSection={<IconFile size={14} />}
              value={file}
              onChange={setFile}
              maw={300}
            />
            <Stack gap={0} style={{ flex: 1 }}>
              <Group justify="space-between" mb={4}>
                <Text size='sm' fw={500}>
                  SHA-256 Digest
                </Text>
                {fileHash && <CopyButton value={fileHash} />}
              </Group>
              <Code block style={{ wordBreak: 'break-all' }}>
                {isHashingFile ? 'Computing hash...' : (fileHash || 'Select a file to see its hash...')}
              </Code>
            </Stack>
          </Group>
        </PageSection>
      </Container>
    </>
  );
}
