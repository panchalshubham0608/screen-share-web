
.PHONY: clean
clean:
	rm -f *.o *.a *.so *.so.* *.dll *.dylib
	rm -rf node_modules

.PHONY: start
start: 
	@echo "Starting client..."
	@ if [ -d "node_modules" ]; then \
		npm start; \
	else \
		npm install; \
		npm start; \
	fi

.PHONY: serve
serve:
	@if ! serve -v; then \
		npm install -g serve; \
	fi
	@serve -d build
