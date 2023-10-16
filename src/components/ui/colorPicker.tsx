import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// TODO Change to Select instead of popover

const twColors = [
  'slate',
  'zinc',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
];

const twIntensities = [
  '400',
  '500',
  '600',
  '700',
  '800',
  '900'
]

export function ColorPicker({ defaultBackgroundColor } : {
  defaultBackgroundColor?: string
}) {
  return (
    <Popover>
      <PopoverTrigger>
        Choose a color
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-2">
        {twColors.map(color => (
          <div className="grid grid-cols-2">
            <p>{color}</p>
            <div className="flex flex-row">
              {twIntensities.map(i => <ColorSquare color={`bg-${color}-${i}`} />)}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function ColorSquare({ color } : { color: `bg-${string}-${number | string}`}) {
  return (
    <div className={`h-5 w-4 border border-r-0 last:border border-white ${color}`}></div>
  );
}