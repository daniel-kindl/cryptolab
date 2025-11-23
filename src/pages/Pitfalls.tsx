/**
 * Pitfalls
 * Teaches: Common crypto mistakes (Base64 != Encryption, Unsalted Hashes).
 * Algorithms: Base64, MD5 (for attack demo).
 * NOTE: Do not change crypto behavior here; only UI around src/crypto/*.ts.
 */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Text,
  Accordion,
  TextInput,
  Button,
  Alert,
  Code,
  Group,
  ThemeIcon,
  Switch,
  SimpleGrid,
  Badge,
  Stack,
  Card,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconShieldLock,
  IconEye,
  IconEyeOff,
} from '@tabler/icons-react';
import { stringToBase64, base64ToString } from '../crypto/encoding';
import { computeHash } from '../crypto/hash';
import { PageHeader, PageSection } from '../components/ui/PageComponents';
import { CopyButton } from '../components/ui/CopyButton';
import { EducatorToggle } from '../components/ui/EducatorToggle';
import { DetailedNote } from '../components/ui/DetailedNote';

export function Pitfalls() {
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [showDetailed, setShowDetailed] = useState(false);

  // Smart Presets
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const params = new URLSearchParams(location.search);
    const sc = params.get('scenario') || hash;

    if (sc === 'base64-fallacy') {
      // Accordion default value handles this if we pass it, but Accordion is uncontrolled here.
      // We might need to make Accordion controlled or just let it be.
      // The default is 'base64', so it works.
    } else if (sc === 'unsalted-hash') {
      // We need to control the accordion to switch to hashing
      setAccordionValue('hashing');
    }
  }, [location]);

  const [accordionValue, setAccordionValue] = useState<string | null>('base64');

  // Base64 Demo
  const [secret, setSecret] = useState('MyPassword123');
  const encoded = stringToBase64(secret);
  const [attackerModeBase64, setAttackerModeBase64] = useState(false);

  // Hash Demo
  const [password, setPassword] = useState('123456');
  const [hash, setHash] = useState('');
  const [cracked, setCracked] = useState(false);
  const [attackerModeHash, setAttackerModeHash] = useState(false);

  const checkHash = async () => {
    const h = await computeHash(password, 'MD5');
    setHash(h);
    // Simulate "cracking" common passwords
    const commonHashes: Record<string, string> = {
      e10adc3949ba59abbe56e057f20f883e: '123456',
      '5f4dcc3b5aa765d61d8327deb882cf99': 'password',
      '098f6bcd4621d373cade4e832627b4f6': 'test',
    };
    if (commonHashes[h]) {
      setCracked(true);
    } else {
      setCracked(false);
    }
  };

  const getAttackerStyle = (isActive: boolean) => ({
    background: isActive
      ? isDark
        ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.15) 0%, rgba(255, 107, 107, 0.05) 100%)'
        : 'linear-gradient(135deg, var(--mantine-color-red-0) 0%, var(--mantine-color-red-1) 100%)'
      : undefined,
    borderColor: isActive ? 'var(--mantine-color-red-5)' : undefined,
  });

  return (
    <>
      <PageHeader
        title='Common Pitfalls'
        description='Cryptography is hard to get right. Even with good intentions, developers often make mistakes that leave data vulnerable.'
        icon={<IconAlertTriangle size={32} />}
        color='red'
        compact
      />

      <Container size='lg'>
        <Group justify="space-between" mb="md" align="flex-start">
          <Alert color="orange" variant="light" radius="md" py="xs" icon={<IconAlertTriangle size={16} />}>
            These demos are simplified; real-world attacks are more complex.
          </Alert>
          <EducatorToggle value={showDetailed} onChange={setShowDetailed} />
        </Group>

        <PageSection title='Interactive Scenarios' delay={0.1}>
          <Accordion variant='separated' radius='lg' chevronPosition='left' value={accordionValue} onChange={setAccordionValue}>
            {/* SCENARIO 1: BASE64 */}
            <Accordion.Item value='base64'>
              <Accordion.Control
                icon={
                  <ThemeIcon color='orange' variant='light'>
                    <IconAlertTriangle size={16} />
                  </ThemeIcon>
                }
              >
                <Text fw={600}>Mistake #1: Using Base64 as "Encryption"</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text mb='lg'>
                  Base64 is an <b>encoding</b> scheme, not encryption. It obfuscates data but
                  provides <b>zero confidentiality</b>. Anyone can decode it instantly.
                </Text>

                {showDetailed && (
                  <DetailedNote title="Security through Obscurity">
                    <Text size="sm">
                      Relying on the hope that attackers won't figure out your encoding scheme is called "Security through Obscurity". It never works. 
                      Base64 strings are easily recognizable by their character set and padding ('=').
                    </Text>
                  </DetailedNote>
                )}

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing='lg'>
                  <Card p='lg' radius='lg' withBorder>
                    <Group justify='space-between' mb='md'>
                      <Badge color='blue'>Developer View</Badge>
                      <Switch
                        label='Attacker View'
                        checked={attackerModeBase64}
                        onChange={(e) => setAttackerModeBase64(e.currentTarget.checked)}
                        color='red'
                        onLabel={<IconEye size={14} />}
                        offLabel={<IconEyeOff size={14} />}
                      />
                    </Group>

                    <TextInput
                      label='Sensitive Data'
                      value={secret}
                      onChange={(e) => setSecret(e.currentTarget.value)}
                      mb='sm'
                    />

                    <Group justify="space-between" mb={-8}>
                      <Text size='sm' fw={500}>
                        Stored Data (Base64):
                      </Text>
                      <CopyButton value={encoded} />
                    </Group>
                    <Code block>{encoded}</Code>
                  </Card>

                  <Card p='lg' radius='lg' withBorder style={getAttackerStyle(attackerModeBase64)}>
                    <Badge color={attackerModeBase64 ? 'red' : 'gray'} mb='md'>
                      {attackerModeBase64 ? 'Attacker View' : 'Public View'}
                    </Badge>

                    {attackerModeBase64 ? (
                      <Stack>
                        <Alert color='red' title='Data Compromised' icon={<IconX />}>
                          The attacker recognizes Base64 and decodes it immediately.
                        </Alert>
                        <Text size='sm' fw={700}>
                          Recovered Plaintext:
                        </Text>
                        <Code block c='red' fw={700}>
                          {base64ToString(encoded)}
                        </Code>
                      </Stack>
                    ) : (
                      <Stack align='center' justify='center' h={150} opacity={0.5}>
                        <IconShieldLock size={48} />
                        <Text size='sm'>Enable "Attacker View" to see the vulnerability</Text>
                      </Stack>
                    )}
                  </Card>
                </SimpleGrid>

                <Alert color='green' icon={<IconCheck />} mt='lg' title='The Fix'>
                  Use proper encryption (like AES-GCM) if you need confidentiality. Use Base64 only
                  for safe transport of binary data.
                </Alert>
              </Accordion.Panel>
            </Accordion.Item>

            {/* SCENARIO 2: HASHING */}
            <Accordion.Item value='hashing'>
              <Accordion.Control
                icon={
                  <ThemeIcon color='orange' variant='light'>
                    <IconAlertTriangle size={16} />
                  </ThemeIcon>
                }
              >
                <Text fw={600}>Mistake #2: Storing Passwords with Fast, Unsalted Hashes</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text mb='lg'>
                  Using fast algorithms like MD5 or SHA-1 without a "salt" makes passwords
                  vulnerable to
                  <b> Rainbow Table</b> attacks (precomputed lists of hashes).
                </Text>

                {showDetailed && (
                  <DetailedNote title="Rainbow Tables">
                    <Text size="sm">
                      A Rainbow Table is a massive precomputed database of billions of passwords and their corresponding hashes. 
                      If you use a fast hash without a unique "salt" for each user, an attacker can just look up the hash in the table.
                    </Text>
                  </DetailedNote>
                )}

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing='lg'>
                  <Card p='lg' radius='lg' withBorder>
                    <Group justify='space-between' mb='md'>
                      <Badge color='blue'>Developer View</Badge>
                      <Switch
                        label='Attacker View'
                        checked={attackerModeHash}
                        onChange={(e) => {
                          setAttackerModeHash(e.currentTarget.checked);
                          if (e.currentTarget.checked && !hash) checkHash();
                        }}
                        color='red'
                        onLabel={<IconEye size={14} />}
                        offLabel={<IconEyeOff size={14} />}
                      />
                    </Group>

                    <Group align='flex-end' mb='md'>
                      <TextInput
                        label='User Password'
                        placeholder='123456'
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        style={{ flex: 1 }}
                      />
                      <Button onClick={checkHash} variant='light'>
                        Save
                      </Button>
                    </Group>

                    {hash && (
                      <>
                        <Group justify="space-between" mb={-8}>
                          <Text size='sm' fw={500}>
                            Database Entry (MD5):
                          </Text>
                          <CopyButton value={hash} />
                        </Group>
                        <Code block>{hash}</Code>
                      </>
                    )}
                  </Card>

                  <Card p='lg' radius='lg' withBorder style={getAttackerStyle(attackerModeHash)}>
                    <Badge color={attackerModeHash ? 'red' : 'gray'} mb='md'>
                      {attackerModeHash ? 'Attacker View' : 'Public View'}
                    </Badge>

                    {attackerModeHash ? (
                      <Stack>
                        <Alert
                          color='red'
                          title='Rainbow Table Attack'
                          icon={<IconAlertTriangle />}
                        >
                          The attacker compares the hash against a massive database of common
                          passwords.
                        </Alert>

                        {hash ? (
                          cracked ? (
                            <>
                              <Text size='sm' fw={700} c='red'>
                                Match Found!
                              </Text>
                              <Code block c='red' fw={700}>
                                {password}
                              </Code>
                            </>
                          ) : (
                            <Alert color='yellow' title='Not in Demo Table'>
                              This specific password wasn't in our tiny demo list, but MD5 is still
                              broken!
                            </Alert>
                          )
                        ) : (
                          <Text size='sm' c='dimmed'>
                            Waiting for data...
                          </Text>
                        )}
                      </Stack>
                    ) : (
                      <Stack align='center' justify='center' h={150} opacity={0.5}>
                        <IconShieldLock size={48} />
                        <Text size='sm'>Enable "Attacker View" to see the vulnerability</Text>
                      </Stack>
                    )}
                  </Card>
                </SimpleGrid>

                <Alert color='green' icon={<IconCheck />} mt='lg' title='The Fix'>
                  Use slow, salted hashing algorithms designed for passwords, like <b>Argon2</b>,{' '}
                  <b>bcrypt</b>, or <b>scrypt</b>.
                </Alert>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </PageSection>
      </Container>
    </>
  );
}
