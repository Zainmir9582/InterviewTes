"use client"
import React from 'react';
import TextField from '@mui/material/TextField';
import PercentIcon from '@mui/icons-material/Percent';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Data } from '../Data/Data'; // Import your data
import { IconButton } from '@mui/material';

export default function Home() {
  // Load the data
  const data = Data();

  // Map each label instance to unique IDs
  const labelToIdsMap = data.reduce((acc, item) => {
    const label = item.name;
    if (!acc[label]) {
      acc[label] = [];
    }
    acc[label].push(item.id);
    return acc;
  }, {} as { [key: string]: number[] });

  // Initialize state for checkboxes
  const [checked, setChecked] = React.useState<boolean[]>(Array(data.length).fill(false));
  const [checked2, setChecked2] = React.useState<boolean[]>(Array(data.length).fill(false));
  const [selectedRadio, setSelectedRadio] = React.useState('some');
  const [name, setName] = React.useState('');
  const [rate, setRate] = React.useState('');

  // Filter unique IDs based on selected checkboxes
  const getSelectedIds = (state: boolean[], labels: string[]) => {
    const selectedIds: number[] = [];
    state.forEach((isChecked, index) => {
      if (isChecked) {
        const label = labels[index];
        selectedIds.push(...(labelToIdsMap[label] || []));
      }
    });
    return Array.from(new Set(selectedIds)); // Remove duplicates
  };

  // Define labels
  const braceletLabels = ["Jasinthe Bracelet", "Jasinthe Bracelet", "Inspire Bracelet"];
  const otherItemLabels = ["Zero amount item with questions", "Normal item with questions", "normal item "];
// console.log(otherItemLabels)
  // Get selected IDs for both sets of labels
  const selectedIds = [
    ...getSelectedIds(checked, braceletLabels),
    ...getSelectedIds(checked2, otherItemLabels)
  ];
  console.log(selectedIds);

  // Count the number of selected checkboxes
  const selectedCount = selectedIds.length;

  // Form submission handler
  const handleSubmit = () => {
    console.log('Selected IDs:', selectedIds);

    const formData = {
      applicable_items: selectedIds,
      applied_to: selectedRadio,
      name,
      rate: parseFloat(rate) / 100
    };

    console.log('Form Data:', formData);
  };

  return (
    <form className="p-4 bg-gray-100 rounded-lg shadow-md" style={{ position: 'relative' }} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <IconButton
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={() => {
                  alert("This page is close");
                }}
              >
                <CloseIcon />
              </IconButton>
      <h1 className="text-xl font-semibold mb-4">Add Tax</h1>

      <div className="grid grid-cols-2 gap-2">
        {/* Large TextField for name */}
        <TextField
          size="small"
          type="text"
          placeholder="Name"
          className="bottom-4 mt-8"
          sx={{ m: 0, width: 500 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Small TextField for rate */}
        <TextField
          size="small"
          type="text"
          placeholder="Rate"
          className="bottom-4 mt-8"
          sx={{ ml: 1, width: 150 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PercentIcon sx={{ fontSize: 16, color: 'gray' }} />
              </InputAdornment>
            ),
          }}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="specific"
          name="radio-buttons-group"
          value={selectedRadio}
          onChange={(e) => setSelectedRadio(e.target.value)}
        >
          <FormControlLabel value="all" control={<Radio />} label="Apply to all items collections" />
          <FormControlLabel value="some" control={<Radio />} label="Apply to specific items" />
        </RadioGroup>
      </FormControl>
      <hr />

      {selectedRadio === 'some' && (
        <>
          <div className="flex space-x-3">
            <TextField
              size="small"
              type="text"
              placeholder="Search Item"
              className="bottom-4 mt-8"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 20, color: 'gray' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ m: 0, width: 250 }}
            />
          </div>

          <div>
            <FormControlLabel
              label="Bracelets"
              control={<Checkbox checked={checked.every(Boolean)} onChange={(e) => {
                const isChecked = e.target.checked;
                setChecked(Array(braceletLabels.length).fill(isChecked));
              }} />}
              sx={{ backgroundColor: 'lightgrey', borderRadius: '4px', padding: '8px', display: 'block', mt:2 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              {braceletLabels.map((label, index) => (
                <FormControlLabel
                  key={`${label}-${index}`} // Unique key for each checkbox
                  label={label}
                  control={<Checkbox checked={checked[index]} onChange={(e) => {
                    const updatedChecked = [...checked];
                    updatedChecked[index] = e.target.checked;
                    setChecked(updatedChecked);
                  }} />}
                />
              ))}
            </Box>
          </div>

          <div>
            <FormControlLabel
              label="Other Items"
              control={<Checkbox checked={checked2.every(Boolean)} onChange={(e) => {
                const isChecked = e.target.checked;
                setChecked2(Array(otherItemLabels.length).fill(isChecked));
              }} />}
              sx={{ backgroundColor: 'lightgrey', borderRadius: '4px', padding: '8px', display: 'block' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              {otherItemLabels.map((label, index) => (
                <FormControlLabel
                  key={`${label}-${index}`} // Unique key for each checkbox
                  label={label}
                  control={<Checkbox checked={checked2[index]} onChange={(e) => {
                    const updatedChecked = [...checked2];
                    updatedChecked[index] = e.target.checked;
                    setChecked2(updatedChecked);
                  }} />}
                />
              ))}
            </Box>
          </div>
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        onClick={handleSubmit}
      >
        Apply tax to {selectedCount} item{selectedCount > 1 ? '(s)' : ''}
      </Button>
    </form>
  );
}
