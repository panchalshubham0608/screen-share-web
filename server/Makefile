
.PHONY: clean
clean:
	rm -f *.o *.a *.so *.so.* *.dll *.dylib
	rm -rf node_modules

.PHONY: start
start: 
	@echo "$(kill -9 $(lsof -t -i:8000))"
	@echo "Starting client..."
	@ if [ ! -d "node_modules" ]; then \
		npm install; \
	fi
	@# Re-run server on crashes
	@while true; do npm start; sleep 1; done
