
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
