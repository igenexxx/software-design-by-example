# The including file must define a variable TARGETS with the names of everything
# to be created.
all: ${TARGETS}

# Show the targets defined by the including file.
targets:
	@echo ${TARGETS}

# Create HTML or text from a shell script that runs some JavaScript.
# Normally used when there are parameters to the JavaScript file but no extra
# dependencies.
%.html: %.sh %.js
	bash $< 2>&1 | ../_tools/wrap.js > $@
%.out: %.sh %.js
	bash $< 2>&1 | ../_tools/wrap.js > $@
%.slice.out: %.sh %.js
	bash $< 2>&1 | ../_tools/wrap.js --slice > $@

# Create HTML or text when there is only a shell script.
# Normally used when the output depends on multiple .js files, in which case the
# including file must define dependencies.
%.html: %.sh
	bash $< 2>&1 | ../_tools/wrap.js > $@
%.out: %.sh
	bash $< 2>&1 | ../_tools/wrap.js > $@
%.slice.out: %.sh
	bash $< 2>&1 | ../_tools/wrap.js --slice > $@

# Create HTML or text by running JavaScript without parameters.
%.html: %.js
	node $< 2>&1 | ../_tools/wrap.js > $@
%.out: %.js
	node $< 2>&1 | ../_tools/wrap.js > $@
%.slice.out: %.js
	node $< 2>&1 | ../_tools/wrap.js --slice > $@

# Get rid of all generated files.
erase:
	rm -f ${TARGETS}
