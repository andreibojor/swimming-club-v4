import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

import { Button } from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
};

const SuccessMessage = () => {
  const refresh = () => window.location.reload();
  return (
    <motion.section
      className="flex h-full w-full flex-col items-center justify-center gap-4 text-center md:gap-2"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <Icons.CheckCircle className="h-10 w-10" />
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        Thank you!
      </h4>
      <p className="max-w-md text-sm text-neutral-300 md:text-base">
        Thanks for confirming your subscription! We hope you have fun using our
        plataform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
      <div className="mt-6 flex items-center">
        <div className="after:shadow-highlight relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-white/10 after:transition focus-within:after:shadow-[#77f6aa]">
          <Button
            onClick={refresh}
            className="relative rounded-xl border border-black/20 bg-neutral-900 text-neutral-200 shadow-black/10 shadow-input hover:text-white"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Restart
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default SuccessMessage;
