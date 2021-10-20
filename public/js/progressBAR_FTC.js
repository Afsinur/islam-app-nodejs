const showFTCprogs = async (url, header) => {
  let loadEndsTM = 1200;

  let app = document.createElement("div");
  Object.assign(app.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "rgba(61, 61, 61, 0.301)",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    zIndex: 100000,
  });

  app.style.display = "flex";

  let BAR = document.createElement("DIV");
  Object.assign(BAR.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "5px",
    background: "rgb(255, 20, 35)",
    transform: "translateX(-100%)",
    zIndex: 99999,
  });

  document.body.appendChild(app);
  document.body.appendChild(BAR);

  let totalLEN = 0;
  let ttlREC = 0;

  const response = await fetch(url, header);
  // Retrieve its body as ReadableStream

  const FL_SIZE = response.headers.get("Content-Length");

  const reader = response.body.getReader();

  const ReadableStreamObj = {
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        // When no more data needs to be consumed, break the reading
        if (done) {
          break;
        }

        // Enqueue the next data chunk into our target stream
        controller.enqueue(value);

        totalLEN += value.length;
        ttlREC = (totalLEN * 100) / FL_SIZE;

        app.innerHTML = `<span>${ttlREC.toFixed(2)}%</span>`;

        if (ttlREC === 100) {
          app.style.display = "none";
          BAR.style.transform = `translateX(-100%)`;

          let div = document.createElement("div");

          div.innerHTML += `Load Ends!`;
          Object.assign(div.style, {
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translate(-50%, 0%)",
            background: "#50ab30",
            padding: "10px",
            borderRadius: "5px",
            color: "#fff",
          });

          document.body.appendChild(div);

          app.remove();
          BAR.remove();

          setTimeout(() => {
            div.remove();
          }, loadEndsTM);
        } else if (ttlREC < 100 && ttlREC !== 100) {
          BAR.style.transform = `translateX(-${100 - ttlREC}%)`;
        }
      }

      // Close the stream
      controller.close();
      reader.releaseLock();
    },
  };

  const rs = new ReadableStream(ReadableStreamObj);
  // Create a new response out of the stream
  const rs1 = new Response(rs);

  // Create an object URL for the response
  const json__ = await rs1.json();
  return json__;
};
