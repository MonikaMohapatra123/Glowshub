#!/bin/bash

# Create the main folder
mkdir -p DynamicEditForm

# Navigate into it
cd DynamicEditForm || exit

# Create the files
touch DynamicEditForm.js
touch FormRenderer.js
touch FileField.js
touch SubFieldArray.js
touch DropdownField.js
touch ModalViewer.js
touch ImageSelectPopupWrapper.js
touch DynamicEditForm.css

# Success message
echo "✅ DynamicEditForm structure created with all required files."
