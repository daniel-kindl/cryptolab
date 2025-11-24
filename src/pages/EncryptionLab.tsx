/**
 * EncryptionLab
 * Teaches: Caesar, XOR, Block Ciphers (ECB vs CBC).
 * Algorithms: Caesar, XOR, AES (conceptual visualization).
 * NOTE: Do not change crypto behavior here; only UI around src/crypto/*.ts.
 */
import { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Text,
  Tabs,
  TextInput,
  Slider,
  Stack,
  Grid,
  Code,
  Badge,
  Alert,
  Table,
  ScrollArea,
  Card,
  Group,
  Loader,
  Center,
  useMantineColorScheme,
} from '@mantine/core';
import { IconLock, IconInfoCircle } from '@tabler/icons-react';
import { caesarEncrypt } from '../crypto/caesar';
import { xorEncrypt, xorDecrypt } from '../crypto/xor';
import { splitIntoBlocks } from '../crypto/blocks';
import { PageHeader } from '../components/ui/PageComponents';
import { PageSection } from '../components/layout/PageSection';
import { ExamplePicker } from '../components/ui/ExamplePicker';
import { CopyButton } from '../components/ui/CopyButton';
import { EducatorToggle } from '../components/ui/EducatorToggle';
import { DetailedNote } from '../components/ui/DetailedNote';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const BlockDiagram = lazy(() =>
  import('../components/viz/BlockDiagram').then((module) => ({ default: module.BlockDiagram })),
);

export function EncryptionLab() {
  useDocumentTitle('Encryption & Block Modes — Cryptolab');
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState<string | null>('caesar');
  const [showDetailed, setShowDetailed] = useState(false);

  // Caesar State
  const [caesarInput, setCaesarInput] = useState('HELLO CAESAR');
  const [shift, setShift] = useState(3);
  const caesarOutput = caesarEncrypt(caesarInput, shift);

  // XOR State
  const [xorInput, setXorInput] = useState('Secret Message');
  const [xorKey, setXorKey] = useState('KEY');
  const xorOutput = xorEncrypt(xorInput, xorKey);
  const xorDecrypted = xorDecrypt(xorOutput, xorKey);

  // AES/Block State (Conceptual)
  const [blockInput, setBlockInput] = useState('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'); // 32 chars = 2 blocks
  const blocks = splitIntoBlocks(blockInput);

  // Smart Presets
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const params = new URLSearchParams(location.search);
    const sc = params.get('scenario') || hash;

    if (sc === 'ecb-pattern') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab('aes');
      setBlockInput('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    }
  }, [location]);

  // ECB Mode: Each block is encrypted independently using XOR with the key.
  // This is a TOY implementation for educational visualization only - NOT real AES!
  // In real ECB, identical plaintext blocks produce identical ciphertext blocks.
  const ecbBlocks = blocks.map((b) => {
    const plaintext = String.fromCharCode(...b.bytes);
    const encrypted = xorEncrypt(plaintext, 'SECRET_KEY_12345');
    return { ...b, hex: encrypted };
  });

  // CBC Mode: Each block is XORed with the previous ciphertext before encryption.
  // This is a TOY implementation for educational visualization only - NOT real AES!
  // We treat hex strings as text for simplicity in this educational demo.
  const cbcBlocks = [];
  let prevCiphertext = '00000000000000000000000000000000'; // Initialization Vector (IV)
  for (const block of blocks) {
    const plaintext = String.fromCharCode(...block.bytes);
    // XOR plaintext with previous ciphertext (treating hex string as text for simplicity)
    const mixed = xorEncrypt(plaintext, prevCiphertext);
    // Encrypt the mixed result with the key
    const encrypted = xorEncrypt(mixed, 'SECRET_KEY_12345');
    cbcBlocks.push({ ...block, hex: encrypted });
    // Use this ciphertext as input for next block
    prevCiphertext = encrypted;
  }

  // Caesar Alphabet Mapping
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const shiftedAlphabet = alphabet.map((_char, i) => {
    const newIndex = (i + shift) % 26;
    return alphabet[newIndex];
  });

  const aesExamples = [
    { label: 'Repeating Pattern', value: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
    { label: 'Structured Data', value: '{"id":123,"role":"admin"}{"id":123,"role":"admin"}' },
  ];

  return (
    <>
      <PageHeader
        title='Encryption Lab'
        description='Encryption uses a secret key to make data unreadable. Unlike encoding, it cannot be reversed without the key.'
        icon={<IconLock size={32} />}
        lab='encryption'
        compact
      />

      <Container size='lg'>
        <Group justify='flex-end' mb='md'>
          <EducatorToggle value={showDetailed} onChange={setShowDetailed} />
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab} variant='pills' radius='xl' mb='xl'>
          <Tabs.List grow>
            <Tabs.Tab value='caesar' fw={600}>
              Caesar Cipher (Toy)
            </Tabs.Tab>
            <Tabs.Tab value='xor' fw={600}>
              XOR Cipher (Toy)
            </Tabs.Tab>
            <Tabs.Tab value='aes' fw={600}>
              Block Cipher Modes (Toy Demo)
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='caesar' pt='xl'>
            <PageSection title='Caesar Cipher' delay={0.1}>
              <Text mb='lg'>
                One of the simplest ciphers. It shifts every letter by a fixed number of positions
                in the alphabet.
              </Text>

              <Grid gutter='xl'>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label='Input Text (letters will be shifted)'
                    value={caesarInput}
                    onChange={(e) => setCaesarInput(e.currentTarget.value.toUpperCase())}
                    mb='lg'
                  />

                  <Text size='sm' fw={500} mb='xs'>
                    Shift Amount: {shift}
                  </Text>
                  <Slider
                    value={shift}
                    onChange={setShift}
                    min={0}
                    max={25}
                    marks={[
                      { value: 0, label: '0' },
                      { value: 13, label: '13' },
                      { value: 25, label: '25' },
                    ]}
                    mb='xl'
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Group justify='space-between' mb={4}>
                    <Text size='sm' fw={500}>
                      Ciphertext Output
                    </Text>
                    <CopyButton value={caesarOutput} />
                  </Group>
                  <TextInput
                    value={caesarOutput}
                    readOnly
                    variant='filled'
                    styles={{ input: { fontFamily: 'monospace', fontWeight: 'bold' } }}
                  />
                </Grid.Col>
              </Grid>

              <Text size='sm' fw={700} mt='xl' mb='sm' c='dimmed' tt='uppercase'>
                Alphabet Mapping
              </Text>
              <ScrollArea>
                <Table withTableBorder withColumnBorders striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th w={80}>Plain</Table.Th>
                      {alphabet.map((c) => (
                        <Table.Th key={c} ta='center' style={{ minWidth: 30 }}>
                          {c}
                        </Table.Th>
                      ))}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td fw={700}>Cipher</Table.Td>
                      {shiftedAlphabet.map((c, i) => (
                        <Table.Td key={i} ta='center' c='violet' fw={700}>
                          {c}
                        </Table.Td>
                      ))}
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </PageSection>
          </Tabs.Panel>

          <Tabs.Panel value='xor' pt='xl'>
            <PageSection title='XOR Cipher' delay={0.1}>
              <Text mb='lg'>
                Combines bits using the XOR operation. If you XOR twice with the same key, you get
                the original data back. This is the basis for many modern stream ciphers.
              </Text>

              {showDetailed && (
                <DetailedNote title='Why XOR?'>
                  <Text size='sm'>
                    XOR is the perfect cryptographic operator because it is reversible (A XOR B XOR
                    B = A) and, if the key is random, the output is random.
                  </Text>
                </DetailedNote>
              )}

              <Grid gutter='xl'>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack>
                    <TextInput
                      label='Input Text'
                      value={xorInput}
                      onChange={(e) => setXorInput(e.currentTarget.value)}
                    />
                    <TextInput
                      label='Secret Key'
                      value={xorKey}
                      onChange={(e) => setXorKey(e.currentTarget.value)}
                    />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack>
                    <Group justify='space-between' mb={-8}>
                      <Text size='sm' fw={500}>
                        Ciphertext (Hex)
                      </Text>
                      <CopyButton value={xorOutput} />
                    </Group>
                    <Code block style={{ minHeight: 40 }}>
                      {xorOutput}
                    </Code>

                    <Text size='sm' fw={500} mt='sm'>
                      Decrypted (Ciphertext XOR Key)
                    </Text>
                    <Code block style={{ minHeight: 40 }}>
                      {xorDecrypted}
                    </Code>
                  </Stack>
                </Grid.Col>
              </Grid>
            </PageSection>
          </Tabs.Panel>

          <Tabs.Panel value='aes' pt='xl'>
            <PageSection title='Block Cipher Modes: ECB vs CBC' delay={0.1}>
              <Alert
                icon={<IconInfoCircle size={16} />}
                title='Educational Demo: Toy XOR-Based Visualization'
                color='blue'
                mb='lg'
              >
                This demonstrates the <b>concept</b> of block cipher modes (ECB vs CBC) using a
                simple XOR operation, <b>not real AES encryption</b>. We use colors to show how
                identical plaintext blocks appear in ciphertext. Same color = Same ciphertext.
              </Alert>

              {showDetailed && (
                <DetailedNote title='ECB vs CBC (Real Cryptography Concepts)'>
                  <Text size='sm' mb='xs'>
                    In real block ciphers like AES:
                  </Text>
                  <Text size='sm' mb='xs'>
                    <b>ECB (Electronic Codebook)</b> encrypts each block independently. This is
                    insecure because identical plaintext blocks produce identical ciphertext blocks,
                    revealing patterns in the data.
                  </Text>
                  <Text size='sm'>
                    <b>CBC (Cipher Block Chaining)</b> XORs each plaintext block with the previous
                    ciphertext block before encryption. This hides patterns, making it much more
                    secure. This demo uses toy XOR operations to show the concept visually.
                  </Text>
                </DetailedNote>
              )}

              <ExamplePicker
                examples={aesExamples}
                onSelect={setBlockInput}
                label='Load Pattern:'
                currentValue={blockInput}
              />

              <TextInput
                label="Input Text (Try repeating patterns like 'AAAAAAAA')"
                value={blockInput}
                onChange={(e) => setBlockInput(e.currentTarget.value)}
                mb='xl'
              />

              <Grid gutter='xl'>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Card
                    p='md'
                    withBorder
                    style={{
                      borderColor: 'var(--mantine-color-red-3)',
                      backgroundColor: isDark
                        ? 'rgba(255, 107, 107, 0.1)'
                        : 'var(--mantine-color-red-0)',
                    }}
                  >
                    <Badge color='red' mb='sm'>
                      ECB Mode (Insecure)
                    </Badge>
                    <Text size='sm' mb='md'>
                      Electronic Codebook. Each block is encrypted independently. Identical
                      plaintext blocks → identical ciphertext blocks.
                      <b> Pattern is preserved.</b>
                    </Text>
                    <Suspense
                      fallback={
                        <Center p='xl'>
                          <Loader />
                        </Center>
                      }
                    >
                      <BlockDiagram blocks={ecbBlocks} label='Ciphertext Blocks' />
                    </Suspense>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Card
                    p='md'
                    withBorder
                    style={{
                      borderColor: 'var(--mantine-color-green-3)',
                      backgroundColor: isDark
                        ? 'rgba(81, 207, 102, 0.1)'
                        : 'var(--mantine-color-green-0)',
                    }}
                  >
                    <Badge color='green' mb='sm'>
                      CBC Mode (Secure)
                    </Badge>
                    <Text size='sm' mb='md'>
                      Cipher Block Chaining. Each plaintext block is XORed with the previous
                      ciphertext block before encryption.
                      <b> Pattern is hidden.</b>
                    </Text>
                    <Suspense
                      fallback={
                        <Center p='xl'>
                          <Loader />
                        </Center>
                      }
                    >
                      <BlockDiagram blocks={cbcBlocks} label='Ciphertext Blocks' />
                    </Suspense>
                  </Card>
                </Grid.Col>
              </Grid>
            </PageSection>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
