# Assets Directory

This directory contains all the static assets for the DevConnect application.

## Directory Structure

```
public/assets/
├── images/          # Image assets
│   ├── avatars/    # User profile pictures
│   ├── icons/      # UI icons and logos
│   ├── backgrounds/# Background images
│   └── projects/   # Project-related images
├── fonts/          # Custom fonts
└── videos/         # Video assets
```

## Usage

1. **Images**
   - Use `.webp` format for better performance
   - Optimize images before adding them
   - Keep file sizes under 200KB when possible
   - Use descriptive filenames

2. **Icons**
   - Use SVG format when possible
   - Keep consistent naming convention
   - Use the `@heroicons/react` package for UI icons

3. **Backgrounds**
   - Optimize for web use
   - Consider using CSS gradients when possible
   - Keep file sizes minimal

## Best Practices

1. **Naming Convention**
   - Use kebab-case for filenames
   - Include size/resolution in filename if relevant
   - Example: `user-avatar-48x48.webp`

2. **Organization**
   - Keep related assets together
   - Use subdirectories for better organization
   - Remove unused assets

3. **Optimization**
   - Compress images before adding
   - Use appropriate image formats
   - Consider responsive images 