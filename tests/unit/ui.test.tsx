import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EducatorToggle } from '../../src/components/ui/EducatorToggle';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EncodingLab } from '../../src/pages/EncodingLab';
import { cryptolabTheme } from '../../src/theme/cryptolabTheme';

// Mock matchMedia for Mantine
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('EducatorToggle', () => {
  it('renders correctly', () => {
    render(
      <MantineProvider theme={cryptolabTheme}>
        <EducatorToggle value={false} onChange={() => {}} />
      </MantineProvider>
    );
    expect(screen.getByText('Explanation Density:')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(
      <MantineProvider theme={cryptolabTheme}>
        <EducatorToggle value={false} onChange={handleChange} />
      </MantineProvider>
    );
    
    // Find the "Educator" segment
    const educatorOption = screen.getByText('Educator');
    fireEvent.click(educatorOption);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe('Smart Presets', () => {
  it('EncodingLab loads emoji scenario from query param', async () => {
    render(
      <MantineProvider theme={cryptolabTheme}>
        <MemoryRouter initialEntries={['/encoding?scenario=emoji']}>
          <Routes>
            <Route path="/encoding" element={<EncodingLab />} />
          </Routes>
        </MemoryRouter>
      </MantineProvider>
    );

    // Check if input is set to emoji
    // We need to find the input element. It has label "Text to Encode"
    const input = await screen.findByLabelText('Text to Encode');
    expect(input).toHaveValue('👋 Hello 🌍');
  });
});
