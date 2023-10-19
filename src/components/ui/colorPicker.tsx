import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Input } from "./input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Label } from "./label";
import { Button } from "./button";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

export function ColorPicker(props : {
  onColorChange?: (arg0: string) => void,
}) {

  const defaultColors = [
    "#0A576A", "#3CFECA", "#1600FC",
    "#06B95B", "#5E294B", "#C9DB33",
    "#286572", "#FC88E6", "#FDC550",
    "#FA4535", "#69C740", "#E21376",
    "#89A7B0", "#0D910C", "#D84A2C",
    "#B5CC83", "#235F94", "#074406",
    "#AAF60B", "#655F0A", "#192BAA",
    "#F3662B", "#C32543", "#1637CF",
    "#3D3058", "#DDBE93", "#576461",
  ]

  const [selectedColor, setSelectedColor] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  type colorFormType = {
    color: string
  }
  const { register, handleSubmit } = useForm<colorFormType>();
  const onFormSubmit: SubmitHandler<colorFormType> = (values) => {
    props.onColorChange?.(values.color);
    setErrorMessage(undefined);
    setSelectedColor(values.color);
    setPopoverOpen(false);
  }
  const onFormSubmitError: SubmitErrorHandler<colorFormType> = (values) => {
    setErrorMessage(values.color?.message);
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger 
        className="border-2 border-black dark:border-white rounded-lg py-1"
        style={{ background: selectedColor }}
      >
        Choose a color
      </PopoverTrigger>
      <PopoverContent className="flex flex-col justify-center gap-2">
        <div className="w-full flex flex-col justify-center items-center">
          <Label className="self-start pb-2">Default Colors</Label>
          <div className="grid grid-cols-9 gap-1">
            {defaultColors.map(color => (
              <TooltipProvider key={color}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                      style={{ background: color }}
                      onClick={() => onFormSubmit({ color })}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>{color}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        <div className="h-0.5 w-full bg-gray-600 rounded-lg"></div>
        <Label>Custom Color</Label>
        <form className="flex flex-col">
          <div className="flex flex-row gap-2">
            <Input
              className="col-span- mb-1"
              placeholder="#aef341"
              {...register('color', {
                required: 'Please enter a color'
              })}
            />
            <Button
              onClick={handleSubmit(onFormSubmit, onFormSubmitError)}
              type="button"
            >
              Add
            </Button>
          </div>
          {errorMessage && <p className="w-full text-start text-red-500 text-sm">{errorMessage}</p>}
        </form>
      </PopoverContent>
    </Popover>
  );
}